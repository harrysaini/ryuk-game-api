'use strict';
var loadController = require('../utils/helper.js').loadController;

module.exports = function(app){

	var indexController = loadController('index');

	app.route('/').get(indexController.index);
}