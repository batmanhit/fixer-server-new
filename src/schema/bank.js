import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    banks: [Bank!]!
    bank(id: String!): Bank!
  }

  type Bank {
    id: String!
    name: String!
  }
`;
