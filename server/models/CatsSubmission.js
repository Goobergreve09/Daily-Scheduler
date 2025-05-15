// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const CatsSubmissionSchema = new mongoose.Schema(
  {
    numberWilds: {
      type: Number,
    },

    numberWays: {
      type: Number,
    },

    hitJackPot: {
      type: Boolean,
    },
    freeGames: {
      type: Number,
    },
    hitBoth: {
      type: Boolean,
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
CatsSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model("CatsSubmission", CatsSubmissionSchema);
