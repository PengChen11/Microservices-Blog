'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/modelFinder.js');

router.param('model', modelFinder);

const {getAll, getOneById, updateOne,  deleteOne, createOne} = require('./routerHandler.js');

const gatewayValidation = require('../middleware/gatewayValidation.js');

// routes 
router.get('/:model', gatewayValidation, getAll);
router.get('/:model/:id', gatewayValidation, getOneById);
router.post('/:model', gatewayValidation, createOne);
router.patch('/:model/:id', gatewayValidation, updateOne);
router.delete('/:model/:id', gatewayValidation, deleteOne);


module.exports = router;