const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  disName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true
  }
});

module.exports = mongoose.model('District', districtSchema);
