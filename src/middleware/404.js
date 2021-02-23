'use strict';

module.exports = (req,res,next) => {
  const error = 'The web resource you requested does not exist';
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.send(error);
  res.end();

};
