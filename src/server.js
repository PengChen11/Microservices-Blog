'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const timeStamp = require('./middleware/timeStamp.js');
app.use(timeStamp);
const logger = require('./middleware/logger.js');
app.use(logger);

//different routers 
const router = require('./route/router.js');
app.use('/api/v1',router);



// routes error handlers
const fourOfour = require('./middleware/404');
app.use('*', fourOfour);
const svrErrors = require('./middleware/error');
app.use(svrErrors);


module.exports={
  server: app,
  start: (port) => {
    const PORT = process.env.PORT || 4443;
    app.listen(PORT, ()=> console.log(`Bloging Service is not listening on port ${PORT}`));
  },
};