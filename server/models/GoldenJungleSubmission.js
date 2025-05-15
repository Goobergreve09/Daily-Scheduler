// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const GoldenJungleSubmissionSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    gameStart: {
      type: Number,
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
GoldenJungleSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model(
  "GoldenJungleSubmission",
  GoldenJungleSubmissionSchema
);
