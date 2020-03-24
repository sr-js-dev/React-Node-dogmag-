const mongoose = require('mongoose');

const postCategorySchema = new mongoose.Schema(
  {
    cat: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PostCategory', postCategorySchema);
