'use strict';
var loadController = require('../utils/helper.js').loadController;

module.exports = function(app){

	var gameController = loadController('game');

	//app.route('/game/:gameID').get(gameController.test);

	app.route('/api/game/:gameID').get(gameController.getGameObj);
	app.route('/api/game/:gameID/start').post(gameController.startGame);
	app.route('/api/game/:gameID/join').post(gameController.joinGame);

}