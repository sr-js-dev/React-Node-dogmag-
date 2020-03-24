const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const professionalProfileSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User'
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    phone: {
      type: String
    },
    companyProfession: [
      {
        profession: {
          type: ObjectId,
          ref: 'Profession'
        }
      }
    ],
    location: {
      city: {
        type: String
      },
      street: {
        type: String
      },
      number: {
        type: Number
      },
      zipcode: {
        type: Number
      },
      geo: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number]
        }
      }
    },

    website: {
      type: String
    },

    facebook: {
      type: String
    },
    worksArea: [
      {
        district: {
          type: ObjectId,
          ref: 'District'
        }
      }
    ],
    mainPhoto: {
      data: Buffer,
      contentType: String
    },
    about: {
      type: String,
      maxlength: 6000
    },

    rexiPro: {
      type: Boolean,
      default: false
    },
    Arabic: {
      type: Boolean,
      default: false
    },
    English: {
      type: Boolean,
      default: false
    },
    Handicap: {
      type: Boolean,
      default: false
    },
    historyPost: {
      type: Array,
      default: []
    },
    avgRating: {
      type: Number
    },
    numOfComments: {
      type: Number,
      default: 0
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

module.exports = mongoose.model(
  'ProfessionalProfile',
  professionalProfileSchema
);
