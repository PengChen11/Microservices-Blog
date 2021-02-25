'use strict';

const mongoose = require('mongoose');

const articles = new mongoose.Schema({
  author: { type: String, required: true},
  title: { type: String, required: true},
  sub_title: {type: String},
  comments: [{ 
    body: String, 
    date: {type: Date, default: Date.now},
    user: {type: String, default: 'Anonymous'},
  }],
  body:{type: String},
}, {timestamps: true});

module.exports = mongoose.model('articles', articles);

