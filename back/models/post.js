const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: 'Professional'
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },

    postCategory: {
      type: Schema.Types.ObjectId,
      ref: 'PostCategory'
    },
    tags: [
      {
        tag: {
          type: Schema.Types.ObjectId,
          ref: 'Tag'
        }
      }
    ],

    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
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

module.exports = mongoose.model('Post', PostSchema);
