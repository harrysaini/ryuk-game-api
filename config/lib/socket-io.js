'use strict';
var socketIO = require('socket.io');
var initSocketControllers = require('../../socket/routes/socket.index.route');
var io;

/*register express app with socket.io*/
function register(app){
	io = socketIO(app);
	initSocketControllers.initIndex(io);
	initSocketControllers.initNameSpaces(io);
}


function getSocketRefrence(){
	return io;
}



module.exports = {
	register : register,
	getSocketRefrence : getSocketRefrence
};


