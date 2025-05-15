import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LUCKYPICK_SUBMIT = gql`
  mutation SubmitLuckyPick($luckyPickData: LuckyPickInput!) {
    submitLuckyPick(luckyPickData: $luckyPickData) {
      _id
      beforeImageUrl
      afterImageUrl
      createdAt
    }
  }
`;

export const MONEYBALL_SUBMIT = gql`
  mutation SubmitMoneyBall($moneyBallData: MoneyBallInput!) {
    submitMoneyBall(moneyBallData: $moneyBallData) {
      _id
      createdAt
    }
  }
`;

export const REGALRICHES_SUBMIT = gql`
  mutation SubmitRegalRiches($regalRichesData: RegalRichesInput!) {
    submitRegalRiches(regalRichesData: $regalRichesData) {
      _id
      createdAt
    }
  }
`;

export const RICHLITTLEPIGGIES_SUBMIT = gql`
  mutation SubmitRichLittlePiggies($richLittlePiggiesData: RichLittlePiggiesInput!) {
    submitRichLittlePiggies(richLittlePiggiesData: $richLittlePiggiesData) {
      _id
      createdAt
    }
  }
`;

export const ROCKETRUMBLE_SUBMIT = gql`
  mutation SubmitRocketRumble($rocketRumbleData: RocketRumbleInput!) {
    submitRocketRumble(rocketRumbleData: $rocketRumbleData) {
      _id
      createdAt
    }
  }
`;

export const CATS_SUBMIT = gql`
  mutation SubmitCats($catsData: CatsInput!) {
    submitCats(catsData: $catsData) {
      _id
      createdAt
    }
  }
`;

export const ASCENDINGFORTUNES_SUBMIT = gql`
  mutation SubmitAscendingFortunes($ascendingFortunesData: AscendingFortunesInput!) {
    submitAscendingFortunes(ascendingFortunesData: $ascendingFortunesData) {
      _id
      createdAt
    }
  }
`;

export const GOLDENJUNGLE_SUBMIT = gql`
  mutation SubmitGoldenJungle($goldenJungleData: GoldenJungleInput!) {
    submitGoldenJungle(goldenJungleData: $goldenJungleData) {
      _id
      createdAt
    }
  }
`;

export const MAGICNILE_SUBMIT = gql`
  mutation SubmitMagicNile($magicNileData: MagicNileInput!) {
    submitMagicNile(magicNileData: $magicNileData) {
      _id
      createdAt
    }
  }
`;