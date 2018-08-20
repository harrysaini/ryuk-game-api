'use strict';
const gameObjInterface = require('../../gameObjects/gameObj');

var socketGameMap = {}; 

exports.handlelFirstPlayerJoined = function(socket , data ){
	var gameID = data.gameID;
	var gameObj = gameObjInterface.getGameObjectFromMap(gameID);
	gameObjInterface.setGameObjectInMap(gameID , gameObj);
	gameObj.firstPlayerSocket = socket.id;

	socketGameMap[socket.id] = gameID;
}


exports.handleSecondPlayerJoined = function(socket , data){
	var gameID = data.gameID;
	var gameObj = gameObjInterface.getGameObjectFromMap(gameID);
	gameObj.secondPlayerSocket = socket.id;
	gameObjInterface.setGameObjectInMap(gameID , gameObj);
	
	socket.broadcast.to(gameObj.firstPlayerSocket).emit('gameStart' , gameObj);
	socket.emit('gameStart' , gameObj );

	socketGameMap[socket.id] = gameID;
}


exports.handleplayMove = function(socket , data){
	var gameID = data.gameID;
	var gameObj = gameObjInterface.getGameObjectFromMap(gameID);
	gameObj.gameState = data;
	gameObjInterface.setGameObjectInMap(gameID , gameObj);

	var opponentId = gameObj.firstPlayerSocket === socket.id ? gameObj.secondPlayerSocket : gameObj.firstPlayerSocket;
	socket.to(opponentId).emit('gameUpdate' , gameObj);

}


exports.handlePlayerDisconnect = function(socket){
	try{
		var gameID = socketGameMap[socket.id];
		var gameObj = gameObjInterface.getGameObjectFromMap(gameID);
		gameObj.gameState.paused = true;
		var opponentId = gameObj.firstPlayerSocket === socket.id ? gameObj.secondPlayerSocket : gameObj.firstPlayerSocket;

		socket.to(opponentId).emit('opponentLeft' , gameObj);
	}catch(e){
		console.log('unhandled error');
		console.log(e.message);
	}
}