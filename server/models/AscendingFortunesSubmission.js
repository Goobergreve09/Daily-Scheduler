// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const AscendingFortunesSubmissionSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    jackPot: {
      type: String,
    },
    combo: {
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
AscendingFortunesSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model(
  "AscendingFortunesSubmission",
  AscendingFortunesSubmissionSchema
);
