// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const RocketRumbleSubmissionSchema = new mongoose.Schema(
  {
    blueNumber: {
      type: Number,
    },

    greenNumber: {
      type: Number,
    },

    purpleNumber: {
      type: Number,
    },
    redNumber: {
        type: Number,
      },

    rocketBoost: {
      type: Boolean,
    },
    freeGames: {
      type: Boolean,
    },
    bet: {
      type: Number,
    },
    cashStart: {
      type: String,
    },
      cashEnd: {
      type: String,
    },
      notes: {
      type: String,
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
RocketRumbleSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model(
  "RocketRumbleSubmission",
  RocketRumbleSubmissionSchema
);