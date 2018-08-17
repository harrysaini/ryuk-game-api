'use strict';

module.exports = function(io){
	
	io.on('connection' , function(socket){
		console.log('user connection');

		socket.emit('join' , {'hello' :'world'});
		socket.on('ok' , function(data){
			console.log(data);
		});
	});
}


