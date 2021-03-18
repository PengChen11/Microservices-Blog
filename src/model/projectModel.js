'use strict';

const mongoose = require('mongoose');

const projects = new mongoose.Schema({
  title: { type: String, required: true},
  summary: {type: String},
  cover_url: {type: String, required: true},
  site_url: {type: String},
  github_url: {type: String},
  description: {type: String, required: true},
});

module.exports = mongoose.model('projects', projects);


