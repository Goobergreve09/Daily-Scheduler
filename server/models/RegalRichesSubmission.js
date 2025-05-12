// Change from `export default` to `module.exports`
const mongoose = require("mongoose");

const RegalRichesSubmissionSchema = new mongoose.Schema(
  {
    whichColor: {
      type: String,
    },

    combo: {
      type: Boolean,
    },

    beginningNumber: {
      type: Number,
    },
    endingNumber: {
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
RegalRichesSubmissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model with `module.exports`
module.exports = mongoose.model(
  "RegalRichesSubmission",
  RegalRichesSubmissionSchema
);