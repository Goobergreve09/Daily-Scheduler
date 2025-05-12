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
