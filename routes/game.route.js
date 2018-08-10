'use strict';
var loadController = require('../utils/helper.js').loadController;

module.exports = function(app){

	var gameController = loadController('game');

	app.route('/game/:gameID').get(gameController.test);
}