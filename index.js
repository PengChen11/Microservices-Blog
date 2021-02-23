'use strict';
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');

const MONGODB_URI = process.env.MONGODB_URI;
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

async function connectDB () {
  await mongoose.connect(MONGODB_URI, mongooseOptions);
  console.log('connected to DB');
} 

try {
  connectDB();
} catch (e ) {
  // this goes to log handler later
  console.error(e);
}


server.start();

// register service with API gateway
const registerService = async () =>{

  const reqConfig = {
    method: 'post',
    url: process.env.API_GATEWAY_URL,
    data: {
      service_name: 'blogService',
      service_url: process.env.MY_URL,
    },
  };
  try {
    const response = await axios(reqConfig);
    console.log('response from gate way', response.data);
  }
  catch (error){
    console.log('gateway connection error');
  }
};

registerService();

setInterval(async()=>{
  registerService();
}, 60000);