'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/modelFinder.js');

router.param('model', modelFinder);

const {getAll, getOneById, updateOne,  deleteOne, createOne} = require('./routerHandler.js');

const gatewayValidation = require('../middleware/gatewayValidation.js');

// routes 
// This service only accept requests from API gateway.
router.use(gatewayValidation);

router.get('/:model', getAll);
router.get('/:model/:id', getOneById);
router.post('/:model', createOne);
router.patch('/:model/:id', updateOne);
router.delete('/:model/:id', deleteOne);


module.exports = router;
