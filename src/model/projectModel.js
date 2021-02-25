'use strict';

const mongoose = require('mongoose');

const projects = new mongoose.Schema({
  title: { type: String, required: true},
  sub_title: {type: String},
  description: {type: String},
  summary: {type: String},
  title_img: {type: String},
});

module.exports = mongoose.model('projects', projects);