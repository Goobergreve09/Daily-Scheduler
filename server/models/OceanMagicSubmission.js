// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const OceanMagicSubmissionSchema = new mongoose.Schema(
  {
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
OceanMagicSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model(
  "OceanMagicSubmission",
  OceanMagicSubmissionSchema
);
