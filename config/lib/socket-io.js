'use strict';
var socketIO = require('socket.io');
var initSocketControllers = require('../../socket-controller/socket.index.controller');
var io;

/*register express app with socket.io*/
function register(app){
	io = socketIO(app);
	initSocketControllers(io);
}


function getSocketRefrence(){
	return io;
}



module.exports = {
	register : register,
	getSocketRefrence : getSocketRefrence
};


