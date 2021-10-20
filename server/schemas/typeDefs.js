const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type User {
        username: String!
        email: String!
        password: String!
        savedBets: [Bets]
    }

    type Bets {
        betId: String!
        team: String!
        amount: Int!
        spread: Int!
    }
`;

module.exports = typeDefs;