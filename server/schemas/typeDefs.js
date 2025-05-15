const typeDefs = `

scalar DateTime

type User {
    _id: ID!
    username: String!
    email: String!
  }

  
type LuckyPick {
  _id: ID!
  beforeImageUrl: String!
  afterImageUrl: String!
  multipliers: Int
  freeGames: Int
  numbersOffBoard: Int
  wilds: Int
  bet: Float
  cashStart: Float
  cashEnd: Float
  allWilds: Boolean
  hitProgressive: Boolean
  stageDetails: String
  answer: String
  createdAt: DateTime
}

input LuckyPickInput {
  beforeImageUrl: String!
  afterImageUrl: String!
  multipliers: Int
  freeGames: Int
  numbersOffBoard: Int
  wilds: Int
  bet: Float
  cashStart: Float
  cashEnd: Float
  allWilds: Boolean
  hitProgressive: Boolean
  stageDetails: String
}

type MoneyBall {
_id: ID!
beginningNumber: Int
endingNumber: Int
hitJackPot: Boolean
jackpotDetails: String
multipliers: String
bet: Float
cashStart: Float
cashEnd: Float
hitFreeGames: Boolean
freeGamesDetails: String
createdAt: DateTime
}

input MoneyBallInput {
beginningNumber: Int
endingNumber: Int
hitJackPot: Boolean
jackpotDetails: String
multipliers: String
bet: Float
cashStart: Float
cashEnd: Float
hitFreeGames: Boolean
freeGamesDetails: String
createdAt: DateTime
}

type RegalRiches {
_id: ID!
whichColor: String
combo: Boolean
beginningNumber: Int
endingNumber: Int
bet: Float
cashStart: Float
cashEnd: Float
notes: String
createdAt: DateTime
}

input RegalRichesInput {
whichColor: String
combo: Boolean
beginningNumber: Int
endingNumber: Int
bet: Float
cashStart: Float
cashEnd: Float
notes: String
createdAt: DateTime
}

type RichLittlePiggies {
_id: ID!
beginningNumber: Int
endingNumber: Int
jackPotFreeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
notes: String
createdAt: DateTime
}

input RichLittlePiggiesInput {
beginningNumber: Int
endingNumber: Int
jackPotFreeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
notes: String
createdAt: DateTime
}

type RocketRumble {
_id: ID!
 blueNumber: Int
greenNumber: Int
purpleNumber: Int
redNumber: Int
rocketBoost: Boolean
freeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
notes: String
createdAt: DateTime
}

input RocketRumbleInput {
 blueNumber: Int
greenNumber: Int
purpleNumber: Int
redNumber: Int
rocketBoost: Boolean
freeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
notes: String
createdAt: DateTime
}

type Cats {
_id: ID!
numberWilds: Int
numberWays: Int
jackPot: Boolean
freeGames: Int
hitBoth: Boolean
bet: Float
cashStart: Float
cashEnd: Float
createdAt: DateTime
}

input CatsInput {
 numberWilds: Int
numberWays: Int
jackPot: Boolean
freeGames: Int
hitBoth: Boolean
bet: Float
cashStart: Float
cashEnd: Float
createdAt: DateTime
}

type AscendingFortunes {
  _id: ID!
 imageUrl: String!
 jackPot: String
  combo: Boolean
  bet: Float
  cashStart: Float
  cashEnd: Float
  notes: String
  createdAt: DateTime
}

input AscendingFortunesInput {
 imageUrl: String!
 jackPot: String
 combo: Boolean
 bet: Float
 cashStart: Float
 cashEnd: Float
 notes: String
 createdAt: DateTime
}

type GoldenJungle {
  _id: ID!
 imageUrl: String!
 gameStart: Int
  freeGames: Boolean
  bet: Float
  cashStart: Float
  cashEnd: Float
  createdAt: DateTime
}

input GoldenJungleInput {
 imageUrl: String!
 gameStart: Int
  freeGames: Boolean
  bet: Float
  cashStart: Float
  cashEnd: Float
  createdAt: DateTime
}

type MagicNile {
  _id: ID!
blocksGreen: Int
blocksRed: Int
blocksBlue: Int
colorHit: String
freeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
createdAt: DateTime
}

input MagicNileInput {
blocksGreen: Int
blocksRed: Int
blocksBlue: Int
colorHit: String
freeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
createdAt: DateTime
}

type OceanMagic {
  _id: ID!
freeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
createdAt: DateTime
}

input OceanMagicInput {
freeGames: Boolean
bet: Float
cashStart: Float
cashEnd: Float
createdAt: DateTime
}


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    luckyPickSubmissions: [LuckyPick]
    moneyBallSubmissions: [MoneyBall]
    regalRichesSubmissions: [RegalRiches]
    richLittlePiggiesSubmissions: [RichLittlePiggies]
    rocketRumbleSubmissions: [RocketRumble]
    catsSubmissions: [Cats]
    ascendingFortunesSubmissions: [AscendingFortunes]
    goldenJungleSubmissions: [GoldenJungle]
    magicNileSubmissions: [MagicNile]
    oceanMagicSubmissions: [OceanMagic]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    resetPassword(email:String!): Auth
    submitLuckyPick(luckyPickData: LuckyPickInput!): LuckyPick
    submitMoneyBall(moneyBallData: MoneyBallInput!): MoneyBall
    submitRegalRiches(regalRichesData: RegalRichesInput!): RegalRiches
    submitRichLittlePiggies(richLittlePiggiesData: RichLittlePiggiesInput!): RichLittlePiggies
    submitRocketRumble(rocketRumbleData: RocketRumbleInput!): RocketRumble
    submitCats(catsData: CatsInput!): Cats
    submitAscendingFortunes(ascendingFortunesData: AscendingFortunesInput!): AscendingFortunes
     submitGoldenJungle(goldenJungleData: GoldenJungleInput!): GoldenJungle
     submitMagicNile(magicNileData: MagicNileInput!): MagicNile
     submitOceanMagic(oceanMagicData: OceanMagicInput!): OceanMagic
  }
`;

module.exports = typeDefs;
