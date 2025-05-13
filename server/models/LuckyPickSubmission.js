// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const LuckyPickSubmissionSchema = new mongoose.Schema(
  {
    beforeImageUrl: {
        type: String,
        required: true,
      },
    afterImageUrl: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    multipliers: {
      type: Number,
    },
    freeGames: {
      type: Number,
    },
    numbersOffBoard: {
      type: Number,
    },
    wilds: {
      type: Number,
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
    allWilds: {
      type: Boolean
    },
    hitProgressive: {
      type: Boolean,
    },
    stageDetails: {
      type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual `id` field to match the frontend convention
LuckyPickSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model("LuckyPickSubmission", LuckyPickSubmissionSchema);

