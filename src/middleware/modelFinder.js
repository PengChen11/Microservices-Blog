'use strict';
const projectModel = require('../model/projectModel.js');
const articleModel = require('../model/articleModel.js');

module.exports = (req, res, next)=>{
  let model = req.params.model;

  switch (model) {
    case 'projects':
      req.model = projectModel;
      next();
      return;
    case 'articles':
      req.model = articleModel;
      next();
      return;
    default:
      next();
      return;
  }
};

