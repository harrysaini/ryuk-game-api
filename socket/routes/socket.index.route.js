'use strict';
const gameSocketRoutes = require('./socket.game.route');

module.exports.initIndex = function(io){

	io.on('connection' , function(socket){
		console.log('user connection');

		socket.emit('join' , {'hello' :'world'});
		socket.on('ok' , function(data){
			console.log(data);
		});
	});
}


module.exports.initNameSpaces = function(io){
	const ticTacNsp = io.of('/tic-tac-toe');
	gameSocketRoutes(ticTacNsp);
}

