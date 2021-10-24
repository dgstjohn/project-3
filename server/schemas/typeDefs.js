const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBets: [Bets]
    }

    type Bets {
        betId: _ID!
        team: String!
        amount: Int!
        spread: Int!
    }

    type Query {
        me: User
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBet(betId: ID!): Bets
        updateBet(betId: ID!): Bets
        removeAccount(userId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;