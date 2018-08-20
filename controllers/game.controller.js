'use strict';
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
const gameObjInterface = require('../gameObjects/gameObj'); 


function GameObject(){

	var obj = {
		joined : 1 ,
		gameState : {},
		remaining : 1,
		msgs : [],
		player1 : undefined,
		player2 : undefined,
		type : undefined
	}

	return obj;
}


function makeNewGame(req , res){
	var gameID = req.params.gameID;
	var gameObj = GameObject();
	gameObj.player1 = req.body.player1;
	gameObj.msgs.push('One player joined');
	gameObj.type = req.body.type;
	gameObj.gameState = req.body.gameState;

	gameObjInterface.setGameObjectInMap(gameID , gameObj);

	return gameObj;

}



function joinNewPlayerToGame(gameObj , gameID , data){
	
	gameObj.joined = gameObj.joined + 1;
	gameObj.remaining = gameObj.remaining - 1;
	gameObj.player2 = data.player2;
	gameObj.msgs.push('SECOND player joined');
	gameObj.gameState = data.gameState;
	
	gameObjInterface.setGameObjectInMap(gameID , gameObj);
	return gameObj;

}



exports.getGameObj = function(req , res) {
	var gameID = req.params.gameID;
	var gameObj = gameObjInterface.getGameObjectFromMap(gameID);

	if(gameObj){
		res.json({
			status : 0 ,
			message : 'Game is ready',
			gameObj : gameObj
		});
	}else{
		res.json({
			status : 1,
			message : 'Game does not exist'
		});
	}
}


exports.startGame = function(req , res){
	var gameID = req.params.gameID;
	var gameObj = gameObjInterface.getGameObjectFromMap(gameID);

	if(gameObj){
		res.json({
			status : 1 ,
			message : 'Game with id already started',
			gameObj : gameObj
		});
	}else{
		gameObj = makeNewGame(req);
		res.json({
			status : 0,
			message : "Game created succesfully, waiting for opponent",
			gameObj : gameObj
		});
	}
}



exports.joinGame = function(req , res){
	var gameID = req.params.gameID;
	var gameObj = gameObjInterface.getGameObjectFromMap(gameID);

	if(!gameObj){
		res.json({
			status : 1 ,
			message : 'Game with id does not exist',
			gameObj : gameObj
		});
	}else{

		if( gameObj.remaining < 1 ){	
			res.json({
				status : 1,
				message : "Two players already joined",
				gameObj : req.gameObj
			});

		}else{
			
			gameObj = joinNewPlayerToGame(gameObj,gameID, req.body);
			res.json({
				status : 0,
				message : 'Game started succesfully',
				gameObj : gameObj
			});
		}
	}
}
