const { signToken, AuthenticationError, generateResetToken } = require("../utils/auth.js");
const { User } = require("../models");
const { LuckyPickSubmission, MoneyBallSubmission } = require("../models");


const resolvers = {
  Query: {
    luckyPickSubmissions: async () => {
      return await LuckyPickSubmission.find().sort({ createdAt: -1 });
    },
    moneyBallSubmissions: async () => {
      return await MoneyBallSubmission.find().sort({ createdAt: -1 });
    },
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
      } catch (error) {
        throw AuthenticationError;
      }
    },

    submitLuckyPick: async (
      parent,
      {
        luckyPickData: {
          beforeImageUrl,
          afterImageUrl,
          multipliers,
          freeGames,
          numbersOffBoard,
          wilds,
          bet,
          cashStart,
          cashEnd,
          hitProgressive,
          stageDetails,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        beforeImageUrl,
        afterImageUrl,
        multipliers,
        freeGames,
        numbersOffBoard,
        wilds,
        bet,
        cashStart,
        cashEnd,
        hitProgressive,
        stageDetails,
      });

      try {
        const newSubmission = await LuckyPickSubmission.create({
          beforeImageUrl,
          afterImageUrl,
          multipliers,
          freeGames,
          numbersOffBoard,
          wilds,
          bet,
          cashStart,
          cashEnd,
          hitProgressive,
          stageDetails,
          answer: "default",
        });
        console.log("New LuckyPick created:", newSubmission);
        return newSubmission;
      } catch (error) {
        console.error("Error creating LuckyPick:", error);
        throw new Error("Failed to create LuckyPick submission.");
      }
    },

    submitMoneyBall: async (
      parent,
      {
        moneyBallData: {
          beginningNumber,
          endingNumber,
          hitJackPot,
          jackpotDetails,
          bet,
          cashStart,
          cashEnd,
          hitFreeGames,
          freeGamesDetails,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        beginningNumber,
        endingNumber,
        hitJackPot,
        jackpotDetails,
        bet,
        cashStart,
        cashEnd,
        hitFreeGames,
        freeGamesDetails,
        createdAt,
      });

      try {
        const newSubmissionMoneyBall = await MoneyBallSubmission.create({
          beginningNumber,
          endingNumber,
          hitJackPot,
          jackpotDetails,
          bet,
          cashStart,
          cashEnd,
          hitFreeGames,
          freeGamesDetails,
          createdAt,
        });
        console.log("New MoneyBall created:", newSubmissionMoneyBall);
        return newSubmissionMoneyBall;
      } catch (error) {
        console.error("Error creating MoneyBall:", error);
        throw new Error("Failed to create MoneyBall submission.");
      }
    },
  },
};

module.exports = resolvers;
