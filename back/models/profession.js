const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  professionName: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  photog: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Profession', professionSchema);
