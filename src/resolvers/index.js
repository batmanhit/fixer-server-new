import { GraphQLDateTime } from 'graphql-iso-date';

import bankResolvers from './bank';
import bankAccountResolvers from './bank_account';
import branchResolvers from './branch';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  bankResolvers,
  bankAccountResolvers,
  branchResolvers
];
