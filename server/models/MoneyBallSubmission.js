// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const MoneyBallSubmissionSchema = new mongoose.Schema(
  {
    beginningNumber: {
      type: Number,
    },

    endingNumber: {
      type: Number,
    },

    hitJackPot: {
      type: Boolean,
    },
    jackpotDetails: {
      type: Number,
    },
    multipliers: {
      type: String
    },

    bet: {
      type: Number,
    },
    cashStart: {
      type: Number,
    },
    cashEnd: {
      type: Number,
    },
    hitFreeGames: {
      type: Boolean,
    },
    freeGamesDetails: {
      type: Number,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual `id` field to match the frontend convention
MoneyBallSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model(
  "MoneyBallSubmission",
  MoneyBallSubmissionSchema
);
