'use strict';
require('dotenv').config();
const axios = require('axios');
const getToken = require('./getToken.js');


module.exports = async (data, logType, type=undefined ) => {

  // step 1, get authenticated through API gateway to get a token, if it does not exsit already.


  if (!global.token) {
    await getToken();
  }

  // step 2, record system monitoring log through API gateway
  let logPath;
  const time = new Date();
  // this payload is going to be recorded in DB
  let payload = {
    service_name: 'Blog',
    time: time.toISOString(),
    type,
    message: typeof(data)==='string'? data : undefined,
  };

  // Only events data came in as String, that's a general messages 
  switch (logType){

    case 'event':
      logPath = 'events';
      break;
    case 'warning':
      logPath = 'warnings';
      // warning OBJ contains data needs to be parsed.
      payload = {
        ...payload,
        req_ip: data.req_ip,
        method: data.method,
        target_url: data.target_url,
        description: data.description,
        requester: data.requester,
        message: data.message,
      };
      break;
    default:
      logPath = 'errors';
      //Errors Obj contains data needs to be parsed.
      payload = {
        ...payload,
        req_ip: data.req_ip,
        method: data.method,
        target_url: data.target_url,
        description: data.description,
        requester: data.requester,
        message: data.error.message || data.error.message_spec,
        code: data.error.code || data.error.statusCode,
        stack: data.error.stack,
      };
      break;
  }

  try {
    const reqConfig = {
      method: 'post',
      url: `${process.env.API_GATEWAY_URL}/monitor/${logPath}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    };
    
    await axios(reqConfig);

  } catch (error){
    // in general, this only happens when connection to API gateway is lost. We will figure out anothe way to notify admin later.
    // one way is to use AWS SMS Queue service.
    console.log('Error occourred when trying to logging to system monitoring service through API gateway');
  }
};
