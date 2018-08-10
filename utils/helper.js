'use strict';
var path = require('path');

var loadRoute = function(name){
	var route = require(path.resolve(__dirname , '../routes/'+name+'.route.js'));
	return route;
}

var loadController = function(name){
	var controller = require(path.resolve(__dirname , '../controllers/'+name+'.controller.js'));
	return controller;
}


module.exports = {
	loadRoute : loadRoute,
	loadController : loadController
}