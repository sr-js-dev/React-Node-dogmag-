const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const calendarSchema = new mongoose.Schema({
  professional: {
    type: ObjectId,
    ref: 'User'
  },
  sunday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  },
  monday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  },
  tuesday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  },
  wednesday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  },
  thursday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  },
  friday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  },
  saturday: {
    openA: {
      type: String
    },
    closeA: {
      type: String
    },
    openB: {
      type: String
    },
    closeB: {
      type: String
    },
    openCalcA: {
      type: String
    },
    closeCalcA: {
      type: String
    },
    openCalcB: {
      type: String
    },
    closeCalcB: {
      type: String
    }
  }
});

module.exports = mongoose.model('Calendar', calendarSchema);
