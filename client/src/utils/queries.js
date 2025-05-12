import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_LUCKYPICK = gql`
  query luckyPickSubmissions {
    luckyPickSubmissions {
      _id
      beforeImageUrl
      afterImageUrl
      answer
      multipliers
      freeGames
      numbersOffBoard
      wilds
      bet
      cashStart
      cashEnd
      hitProgressive
      stageDetails
      createdAt
    }
  }
`;

export const QUERY_MONEYBALL = gql`
  query moneyBallSubmissions {
    moneyBallSubmissions {
      _id
      beginningNumber
      endingNumber
      hitJackPot
      jackpotDetails
      bet
      cashStart
      cashEnd
      hitFreeGames
      freeGamesDetails
      createdAt
    }
  }
`;

export const QUERY_REGAL = gql`
  query regalRichesSubmissions {
    regalRichesSubmissions {
      _id
      whichColor
      combo
      beginningNumber
      endingNumber
      bet
      cashStart
      cashEnd
      notes
      createdAt
    }
  }
`;
