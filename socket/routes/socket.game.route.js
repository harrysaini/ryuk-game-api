'use strict';
const gameSocketController = require('../controllers/socket.game.controller.js');

module.exports = function(nsp){

	nsp.on('connection' , function(socket){
		console.log('user connected on name sapce tic tac toe');

		socket.on('firstPlayerJoined' , function(data){
			gameSocketController.handlelFirstPlayerJoined(socket , data);
		});

		socket.on('secondPlayerJoined' , function(data){
			gameSocketController.handleSecondPlayerJoined(socket , data);
		});

		socket.on('playMove' , function(data){
			gameSocketController.handleplayMove(socket , data);
		})

		socket.on('disconnect' , function(){
			gameSocketController.handlePlayerDisconnect(socket);
		});
	});

}



