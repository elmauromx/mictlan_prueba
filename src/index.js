import http from 'http';
import express from 'express';
import setup from './setup';
//import mongoose from 'mongoose';

const config = require('./config.json');
const app = express();
const server = http.createServer(app);


require('dotenv').config();

setup(app);

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


  let port = process.env.PORT || config.port;
  server.listen(port, () =>{
    console.log(`Starting Mictlan Server on port ${port}`);
  });

process.on('SIGINT', (signal) => {
  console.log(`Stop Mictlan Server ${signal}`);
  process.exit();
});

module.exports = app;
