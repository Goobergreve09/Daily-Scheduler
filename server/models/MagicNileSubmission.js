// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const MagicNileSubmissionSchema = new mongoose.Schema(
  {
    blocksGreen: {
      type: Number,
    },
    blocksRed: {
      type: Number,
    },
    blocksBlue: {
      type: Number,
    },
    colorHit: {
      type: String,
    },

    freeGames: {
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
MagicNileSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model("MagicNileSubmission", MagicNileSubmissionSchema);
