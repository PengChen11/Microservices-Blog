'use strict';

function timestamp(req, res, next) {

  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const output = `${today.toDateString()}  ${time}`;

  // req.requestTime = output;
  req.requestTime = today.toISOString();
  next();
}

module.exports = timestamp;
