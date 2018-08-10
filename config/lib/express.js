'use strict';

//dependencies
var express = require("express");
var path  = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var loadRoute = require('../../utils/helper.js').loadRoute;

//routes
var indexRoute = loadRoute('index');
var gameRoute = loadRoute('game');


function initMiddleWares(app) {

  //init cors request
  app.use(cors());

  //init logger
  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((err, req, res, next) => {
    if (err) {
      console.log('Invalid Request data');
      res.json({
        status : 1,
        message : 'Invalid Request data'
      });
    } else {
      next();
    }
  });

}


function initRoutes(app){
  indexRoute(app);
  gameRoute(app);
}



module.exports.init = function() {

 var app = express();


 initMiddleWares(app);
 initRoutes(app);

 return app;
}