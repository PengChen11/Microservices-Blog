'use strict';
global.token = '';
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');
const monitor = require('./src/tool/monitor.js');

const MONGODB_URI = process.env.MONGODB_URI;
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

async function connectDB () {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    monitor('Blog service now connected to DB', 'event', '200');
  } catch (error){
    // delete when deploy
    console.log('**** DB connection error',error);

    monitor({description:'Blog Service can NOT connect to Database', error}, 'error', '410');
  }
} 

connectDB();


server.start();

// register service with API gateway
const registerService = require('./src/tool/register.js');

registerService();

setInterval(async()=>{
  registerService();
}, 60000);