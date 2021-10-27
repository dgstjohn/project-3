import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
        username
        email
      }
    }
  }
`;

export const SAVE_BET = gql`
  mutation saveBet($betId: ID!) {
    saveBet(betId: $betId) {
      team
      amount
      spread
    }
  }
`;

export const UPDATE_BET = gql`
  mutation updateBet($betId: String!) {
    updateBet(betId: $betId) {
      team
      amount
      spread
    }
  }
`;

export const REMOVE_BET = gql`
mutation removeBet($betId: String!) {
    removeBet (betId: $betId) {
        team
        amount
        spread
    }
}`;

export const REMOVE_ACCOUNT = gql`
  mutation removeAccount($userId: ID!) {
    removeAccount(userId: $userId) {
      user {
        _id
        username
      }
      savedBets
    }
  }
`;
