const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },

    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      required: false,
      type: Boolean
    },
    freeField: {
      headline: {
        type: String
      },
      fieldArray: [
        {
          field: String
        }
      ]
    },
    comments: [
      {
        user: {
          type: ObjectId,
          ref: 'User'
        },
        imageUrl: {
          type: String
        },
        text: {
          type: String
        },
        name: {
          type: String
        },
        score: {
          type: Number
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
