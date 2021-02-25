'use strict';
const axios = require('axios');

module.exports = async (data, modelSelector, type=undefined ) => {
  let modelPath;
  
  switch (modelSelector){

    case 'warning':
      modelPath = 'warnings';
      break;
    case 'event':
      modelPath = 'events';
      break;
    default:
      modelPath = 'errors';
      //Errors Obj contains data needs to be parsed.
      data = {
        ...data,
        error: {
          code: data.error.code,
          message: data.error.message,
          stack: data.error.stack,
        },
      };
      break;
  }

  try {
    const time = new Date();
    const reqConfig = {
      method: 'post',
      url: `${authServiceURL}/user/${id}/password`,
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
      data: req.body,
    }; 
    await new modelPath({
      service_name: 'monitor',
      time: time.toISOString(),
      type,
      data: typeof(data)!='string'? JSON.stringify(data) : data,
    }).save();

  } catch (error){
    console.log('Error occourred when trying to record in DB', error);
  }
};