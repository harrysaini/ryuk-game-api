'use strict';
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');

var gameMap = {};

function getGameObject(){

	var obj = {
		joined : 1 ,
		state : undefined,
		remaining : 1,
		msg : [],
		players : []
	}

	return obj;
}

function setGameObjectInMap(id , obj){
	gameMap[id] = obj;
}


function getGameObjectFromMap(id){
	return gameMap[id];
}


function makeNewGame(req , res){
	var gameID = req.params.gameID;
	var gameObj = getGameObject();
	setGameObjectInMap(gameID , gameObj);
	gameObj.players[0] = "players"+Math.random();
	gameObj.msg.push('One player joined');


	res.json({
			status : 0,
			message : "Wait for second player",
			gameObj : gameObj
		});

}


function gameAlreadyJoined(req , res){
	var gameID = req.params.gameID;
	var gameObj = getGameObjectFromMap(gameID);

	req.gameObj = gameObj;

	if( gameObj.remaining < 1 ){
		gameSlotFull(req , res);
	}else{
		addSecondPlayer(req , res);
	}
}


function gameSlotFull(req , res){

	res.json({
			status : 0,
			message : "Two players joined , can't joined",
			gameObj : req.gameObj
		});
}


function addSecondPlayer( req , res ){
	var gameObj = req.gameObj;

	gameObj.joined = gameObj.joined + 1;
	gameObj.remaining = gameObj.remaining - 1;

	gameObj.players[1] = "players"+Math.random();
	gameObj.msg.push('SECOND player joined');

	res.json({
			status : 0,
			message : "Game can start",
			gameObj : gameObj
		});

}

exports.test = function(req , res) {
	var gameID = req.params.gameID;
	var gameObj = getGameObjectFromMap(gameID);

	if(gameObj){
		gameAlreadyJoined(req , res);
	}else{
		makeNewGame(req , res);
	}
	

}