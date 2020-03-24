const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true
  },
  professions: {
    type: Array,
    default: []
  },
  products: {
    type: Array,
    default: []
  },
  posts: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Tag', tagSchema);
