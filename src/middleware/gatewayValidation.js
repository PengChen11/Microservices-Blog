'use strict';
require('dotenv').config();

module.exports = (req, res, next) =>{
  const allowedIP = process.env.ALLOWED_IP;

  if (req.ip != allowedIP) {
    const error = {message_spec: 'The web resource you requested does not exist', statusCode:404, statusMessage:'Not Found'};
    next(error);
  }
  
  next();
};

