'use strict';
var express = require('./express');
var config = require('../config');
var socket_io = require('./socket-io');



module.exports.start = function() {
	
	var app = express.init();
	var server = require('http').Server(app);
	socket_io.register(server);

	server.listen(config.port , config.host , function(err){
		if(err){
			console.log(err);
		}else{
			console.log('Server is running at -');
			console.log(config.host+':'+config.port);
		}
	});
}



