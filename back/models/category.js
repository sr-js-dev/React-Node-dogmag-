const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: [
    {
      number: {
        type: Number
      },
      headline: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
