import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    branches: [Branch!]!
    branch(id: String!): Branch!
  }

  type Branch {
    id: String!
    name: String!
  }
`;
