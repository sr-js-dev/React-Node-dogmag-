const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const professionalGallerySchema = new mongoose.Schema(
  {
    professional: {
      type: ObjectId,
      ref: 'User'
    },
    g1: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g2: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g3: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g4: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g5: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g6: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g7: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    g8: {
      data: Buffer,
      contentType: String,
      haveImage: {
        type: Boolean,
        default: false
      }
    },
    numberOfImages: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  'ProfessionalGallery',
  professionalGallerySchema
);
