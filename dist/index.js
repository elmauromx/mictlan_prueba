'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _setup = require('./setup');

var _setup2 = _interopRequireDefault(_setup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import mongoose from 'mongoose';

var config = require('./config.json');
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

require('dotenv').config();

(0, _setup2.default)(app);

/*
mongoose.connect('mongodb://localhost/navedb')
  .then(() => {
    let port = process.env.PORT || config.port;
    server.listen(port, () =>{
      console.log(`Starting NJord Server on port ${port}`);
    });
  },
  err => {
    console.error(`Stop NJord Server with error ${err}`);
    process.exit(1);
  });*/

var port = process.env.PORT || config.port;
server.listen(port, function () {
  console.log('Starting Mictlan Server on port ' + port);
});

process.on('SIGINT', function (signal) {
  console.log('Stop Mictlan Server ' + signal);
  process.exit();
});

module.exports = app;