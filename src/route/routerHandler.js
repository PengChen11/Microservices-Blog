'use strict';

function handlerGenerator (method){
  return async (req, res, next)=>{

    if (!req.model) {
      next();
      return;
    }

    const modelPath = req.params.model;
    // if requesting path is not projects nor articles, user get 404
    if (modelPath !='projects' && modelPath != 'articles') {
      next();
      return;
    }

    try{
      let result;
      switch(method){
        case 'getAll':
          result = await req.model.find({});
          break;
        case 'getOneById':
          result = await req.model.findById(req.params.id);
          break;
        case 'createOne':
          result = await new req.model(req.body).save();
          break;
        case 'updateOne':
          result = await req.model.updateOne({_id: req.params.id}, req.body);
          break;
        case 'deleteOne':
          result = await req.model.deleteOne({_id: req.params.id});
      }
      res.json(result);
    }
    catch (err){
      next(err);
    }
  };
}

const getAll = handlerGenerator('getAll');
const getOneById = handlerGenerator('getOneById');
const createOne = handlerGenerator('createOne');
const updateOne = handlerGenerator('updateOne');
const deleteOne = handlerGenerator('deleteOne');


module.exports = {getAll, getOneById, createOne, updateOne, deleteOne};
