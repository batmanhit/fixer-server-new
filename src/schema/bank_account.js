import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    bankAccounts: BankAccountConnection!
    bankAccount(id: String!): BankAccount!
  }

  extend type Mutation {
    createBankAccount(
      accountHolderName: String!
      employeeName: String!
      accountType: String!
      accountNumber: String!
      employeeNumber: String!
      bankId: String!
      branchId: String!
    ): BankAccount!

    updateBankAccount(
      id: String!
      accountHolderName: String
      employeeName: String
      accountType: String
      accountNumber: String
      employeeNumber: String
      bankId: String
      branchId: String
    ): BankAccount!

    deleteBankAccounts(ids: [String!]!): Int!
    deleteBankAccount(id: String!): Boolean!
  }

  type BankAccountConnection {
    rows: [BankAccount!]!
  }

  type BankAccount {
    id: String!
    accountHolderName: String!
    employeeName: String!
    accountType: String!
    accountNumber: String!
    employeeNumber: String!
    bank: Bank!
    branch: Branch!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Subscription {
    bankAccountCreated: BankAccountCreated!
    bankAccountUpdated: BankAccountUpdated!
  }

  type BankAccountCreated {
    bankAccount: BankAccount!
  }

  type BankAccountUpdated {
    bankAccount: BankAccount!
  }
`;
