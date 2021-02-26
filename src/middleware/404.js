'use strict';
const monitor = require('../tool/monitor.js');

module.exports = async(req,res,next) => {
  const error = 'The web resource you requested does not exist bahaha';
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.send(error);
  res.end();

  const ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || 'No IP detected';
  const warningData = {
    req_ip: ip,
    method: req.method,
    target_url: req.originalUrl,
    description: 'The web resource client requested does not exist',
  };

  await monitor(warningData, 'warning', '404');
};
