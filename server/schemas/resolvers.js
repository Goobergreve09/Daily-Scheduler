const { signToken, AuthenticationError, generateResetToken } = require("../utils/auth.js");
const { User } = require("../models");



const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    users: async () => {
      return User.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    
      resetPassword: async (parent, { email }) => {

        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            return false;
          }

          const token = generateResetToken(user);

          return { user, token };


        }
        catch (error) {
          throw AuthenticationError;
        }
      },
 


        saveBook: async (parent, { bookData }, context) => {
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: bookData } },
              { new: true }
            );

            return updatedUser;
          }

          throw AuthenticationError;
        },

          saveMovie: async (parent, { movieData }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedMovies: movieData } },
                { new: true }
              );

              return updatedUser;
            }

            throw AuthenticationError;
          },

            removeBook: async (parent, { bookId }, context) => {
              if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: { savedBooks: { bookId } } },
                  { new: true }
                );

                return updatedUser;
              }

              throw AuthenticationError;
            },

              removeMovie: async (parent, { movieId }, context) => {
                if (context.user) {
                  const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedMovies: { movieId } } },
                    { new: true }
                  );

                  return updatedUser;
                }

                throw AuthenticationError;
              },

                saveWatchlist: async (parent, { movieData }, context) => {
                  if (context.user) {
                    const updatedUser = await User.findByIdAndUpdate(
                      { _id: context.user._id },
                      { $push: { savedWatchlist: movieData } },
                      { new: true }
                    );

                    return updatedUser;
                  }

                  throw AuthenticationError;
                },

                  removeWatchlist: async (parent, { movieId }, context) => {
                    if (context.user) {
                      const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedWatchlist: { movieId } } },
                        { new: true }
                      );

                      return updatedUser;
                    }

                    throw AuthenticationError;
                  },
  },
  };

  module.exports = resolvers;