import { gql } from 'apollo-server-express';

import bankSchema from './bank';
import bankAccountSchema from './bank_account';
import branchSchema from './branch';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, bankSchema, bankAccountSchema, branchSchema];
