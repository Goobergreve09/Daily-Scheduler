const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Import other schemas
const movieSchema = require("./Movie");
const watchlistSchema = require("./Watchlist");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
      minlenth: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    memberSince: {
      type: Date,
    },

    // Set savedBooks to be an array of data that adheres to bookSchema
    savedBooks: [bookSchema],
    savedMovies: [movieSchema],
    savedWatchlist: [watchlistSchema],
  },
  // Set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }


});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// When we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual("bookCount").get(function () {
  return this.savedBooks.length;
});

const User = model("User", userSchema);

module.exports = User;