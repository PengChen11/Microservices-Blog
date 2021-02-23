'use strict';

function handlerGenerator (method){
  return async (req, res, next)=>{

    if (!req.model) {
      next();
      return;
    }

    try{
      let result;
      switch(method){
        case 'findAll':
          result = await req.model.find({});
          break;
        case 'findOne':
          result = await req.model.findById(req.params.id);
          break;
        case 'new':
          result = await new req.model(req.body).save();
          break;
        case 'update':
          result = await req.model.updateOne({_id: req.params.id}, req.body);
          break;
        case 'delete':
          result = await req.model.deleteOne({_id: req.params.id});
      }
      res.json(result);
    }
    catch (err){
      next(err);
    }
  };
}

const getAll = handlerGenerator('findAll');
const getOne = handlerGenerator('findOne');
const createOne = handlerGenerator('new');
const updateOne = handlerGenerator('update');
const deleteOne = handlerGenerator('delete');


module.exports = {getAll, getOne, createOne, updateOne, deleteOne};
