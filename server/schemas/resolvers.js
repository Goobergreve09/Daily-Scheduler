const {
  signToken,
  AuthenticationError,
  generateResetToken,
} = require("../utils/auth.js");
const { User } = require("../models");
const {
  LuckyPickSubmission,
  MoneyBallSubmission,
  RegalRichesSubmission,
  RichLittlePiggiesSubmission,
  RocketRumbleSubmission,
  CatsSubmission,
  AscendingFortunesSubmission,
  GoldenJungleSubmission,
  MagicNileSubmission,
  OceanMagicSubmission,
} = require("../models");

const resolvers = {
  Query: {
    luckyPickSubmissions: async () => {
      return await LuckyPickSubmission.find().sort({ createdAt: -1 });
    },
    moneyBallSubmissions: async () => {
      return await MoneyBallSubmission.find().sort({ createdAt: -1 });
    },
    regalRichesSubmissions: async () => {
      return await RegalRichesSubmission.find().sort({ createdAt: -1 });
    },
    richLittlePiggiesSubmissions: async () => {
      return await RichLittlePiggiesSubmission.find().sort({ createdAt: -1 });
    },
    rocketRumbleSubmissions: async () => {
      return await RocketRumbleSubmission.find().sort({ createdAt: -1 });
    },
    catsSubmissions: async () => {
      return await CatsSubmission.find().sort({ createdAt: -1 });
    },
    ascendingFortunesSubmissions: async () => {
      return await AscendingFortunesSubmission.find().sort({ createdAt: -1 });
    },
    goldenJungleSubmissions: async () => {
      return await GoldenJungleSubmission.find().sort({ createdAt: -1 });
    },
    magicNileSubmissions: async () => {
      return await MagicNileSubmission.find().sort({ createdAt: -1 });
    },
    oceanMagicSubmissions: async () => {
      return await OceanMagicSubmission.find().sort({ createdAt: -1 });
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
    login: async (parent, { username, password }) => {
      // Hardcoded fallback (optional) for development
      const allowedUsername = process.env.ADMIN_USERNAME;
      const allowedPassword = process.env.ADMIN_PASSWORD;

      if (username !== allowedUsername || password !== allowedPassword) {
        throw AuthenticationError;
      }

      // You can create a fake user object for consistent structure
      const mockUser = {
        _id: "admin-id",
        username: allowedUsername,
        email: "admin@example.com",
      };

      const token = signToken(mockUser);
      return { token, user: mockUser };
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
          allWilds,
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
        allWilds,
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
          allWilds,
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
          multipliers,
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
        multipliers,
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
          multipliers,
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

    submitRegalRiches: async (
      parent,
      {
        regalRichesData: {
          whichColor,
          combo,
          beginningNumber,
          endingNumber,
          bet,
          cashStart,
          cashEnd,
          notes,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        whichColor,
        combo,
        beginningNumber,
        endingNumber,
        bet,
        cashStart,
        cashEnd,
        notes,
        createdAt,
      });

      try {
        const newSubmissionRegalRiches = await RegalRichesSubmission.create({
          whichColor,
          combo,
          beginningNumber,
          endingNumber,
          bet,
          cashStart,
          cashEnd,
          notes,
          createdAt,
        });
        console.log("New Regal Riches created:", newSubmissionRegalRiches);
        return newSubmissionRegalRiches;
      } catch (error) {
        console.error("Error creating Regal Riches:", error);
        throw new Error("Failed to create Regal Riches submission.");
      }
    },

    submitRichLittlePiggies: async (
      parent,
      {
        richLittlePiggiesData: {
          beginningNumber,
          endingNumber,
          jackPotFreeGames,
          bet,
          cashStart,
          cashEnd,
          notes,
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
        jackPotFreeGames,
        bet,
        cashStart,
        cashEnd,
        notes,
        createdAt,
      });

      try {
        const newSubmissionRichLittlePiggies =
          await RichLittlePiggiesSubmission.create({
            beginningNumber,
            endingNumber,
            jackPotFreeGames,
            bet,
            cashStart,
            cashEnd,
            notes,
            createdAt,
          });
        console.log(
          "New Rich Little Piggies created:",
          newSubmissionRichLittlePiggies
        );
        return newSubmissionRichLittlePiggies;
      } catch (error) {
        console.error("Error creating Rich Little Piggies:", error);
        throw new Error("Failed to create Rich Little Piggies submission.");
      }
    },

    submitRocketRumble: async (
      parent,
      {
        rocketRumbleData: {
          blueNumber,
          greenNumber,
          purpleNumber,
          redNumber,
          rocketBoost,
          freeGames,
          bet,
          cashStart,
          cashEnd,
          notes,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        blueNumber,
        greenNumber,
        purpleNumber,
        redNumber,
        rocketBoost,
        freeGames,
        bet,
        cashStart,
        cashEnd,
        notes,
        createdAt,
      });

      try {
        const newSubmissionRocketRumble = await RocketRumbleSubmission.create({
          blueNumber,
          greenNumber,
          purpleNumber,
          redNumber,
          rocketBoost,
          freeGames,
          bet,
          cashStart,
          cashEnd,
          notes,
          createdAt,
        });
        console.log("New Rocket Rumble created:", newSubmissionRocketRumble);
        return newSubmissionRocketRumble;
      } catch (error) {
        console.error("Error creating Rocket Rumble:", error);
        throw new Error("Failed to create Rocket Rumble submission.");
      }
    },

    submitCats: async (
      parent,
      {
        catsData: {
          numberWilds,
          numberWays,
          jackPot,
          freeGames,
          hitBoth,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        numberWilds,
        numberWays,
        jackPot,
        freeGames,
        hitBoth,
        bet,
        cashStart,
        cashEnd,
        createdAt,
      });

      try {
        const newSubmissionCats = await CatsSubmission.create({
          numberWilds,
          numberWays,
          jackPot,
          freeGames,
          hitBoth,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        });
        console.log("New Cats created:", newSubmissionCats);
        return newSubmissionCats;
      } catch (error) {
        console.error("Error creating Cats:", error);
        throw new Error("Failed to create Cats submission.");
      }
    },

    submitAscendingFortunes: async (
      parent,
      {
        ascendingFortunesData: {
          imageUrl,
          jackPot,
          combo,
          bet,
          cashStart,
          cashEnd,
          notes,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        imageUrl,
        jackPot,
        combo,
        bet,
        cashStart,
        cashEnd,
        notes,
        createdAt,
      });

      try {
        const newSubmissionAscendingFortunes =
          await AscendingFortunesSubmission.create({
            imageUrl,
            jackPot,
            combo,
            bet,
            cashStart,
            cashEnd,
            notes,
            createdAt,
          });
        console.log(
          "New Ascending Fortunes created:",
          newSubmissionAscendingFortunes
        );
        return newSubmissionAscendingFortunes;
      } catch (error) {
        console.error("Error creating Ascending Fortunes:", error);
        throw new Error("Failed to create Ascending Fortunes submission.");
      }
    },
    submitGoldenJungle: async (
      parent,
      {
        goldenJungleData: {
          imageUrl,
          gameStart,
          freeGames,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        imageUrl,
        gameStart,
        freeGames,
        bet,
        cashStart,
        cashEnd,
        createdAt,
      });

      try {
        const newSubmissionGoldenJungle = await GoldenJungleSubmission.create({
          imageUrl,
          gameStart,
          freeGames,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        });
        console.log("New Golden Jungle created:", newSubmissionGoldenJungle);
        return newSubmissionGoldenJungle;
      } catch (error) {
        console.error("Error creating Golden Jungle:", error);
        throw new Error("Failed to create Golden Jungle submission.");
      }
    },
    submitMagicNile: async (
      parent,
      {
        magicNileData: {
          blocksGreen,
          blocksRed,
          blocksBlue,
          colorHit,
          freeGames,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        },
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        blocksGreen,
        blocksRed,
        blocksBlue,
        colorHit,
        freeGames,
        bet,
        cashStart,
        cashEnd,
        createdAt,
      });

      try {
        const newSubmissionMagicNile = await MagicNileSubmission.create({
          blocksGreen,
          blocksRed,
          blocksBlue,
          colorHit,
          freeGames,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        });
        console.log("New Magic Nile created:", newSubmissionMagicNile);
        return newSubmissionMagicNile;
      } catch (error) {
        console.error("Error creating Magic Nile:", error);
        throw new Error("Failed to create Magic Nile submission.");
      }
    },
    submitOceanMagic: async (
      parent,
      { oceanMagicData: { freeGames, bet, cashStart, cashEnd, createdAt } },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }

      console.log("Data received in resolver:", {
        freeGames,
        bet,
        cashStart,
        cashEnd,
        createdAt,
      });

      try {
        const newSubmissionOceanMagic = await OceanMagicSubmission.create({
          freeGames,
          bet,
          cashStart,
          cashEnd,
          createdAt,
        });
        console.log("New Ocean Magic created:", newSubmissionOceanMagic);
        return newSubmissionOceanMagic;
      } catch (error) {
        console.error("Error creating Ocean Magic:", error);
        throw new Error("Failed to create Ocean Magic submission.");
      }
    },
  },
};

module.exports = resolvers;
