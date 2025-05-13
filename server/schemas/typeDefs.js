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
  }

  type Mutation {
   login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    resetPassword(email:String!): Auth
      submitLuckyPick(luckyPickData: LuckyPickInput!): LuckyPick
      submitMoneyBall(moneyBallData: MoneyBallInput!): MoneyBall
      submitRegalRiches(regalRichesData: RegalRichesInput!): RegalRiches
       submitRichLittlePiggies(richLittlePiggiesData: RichLittlePiggiesInput!): RichLittlePiggies
  }
`;

module.exports = typeDefs;
