import pubsub, { EVENTS } from '../subscription';

export default {
  Query: {
    bankAccounts: async (parent, {}, { models }) => {
      return {
        rows: await models.BankAccount.findAll({
          order: [['updatedAt', 'DESC']]
        })
      };
    },
    bankAccount: async (parent, { id }, { models }) => {
      return await models.BankAccount.findById(id);
    },
  },

  Mutation: {
    createBankAccount: async (parent, { accountHolderName, employeeName, accountType, accountNumber, employeeNumber, bankId, branchId }, { models }) => {
      const bankAccount = await models.BankAccount.create({
        accountHolderName,
        employeeName,
        accountType,
        accountNumber,
        employeeNumber,
        bankId,
        branchId
      });

      pubsub.publish(EVENTS.BANK_ACCOUNT.CREATED, {
        bankAccountCreated: { bankAccount },
      });

      return bankAccount;
    },

    updateBankAccount: async (parent, { id, accountHolderName, employeeName, accountType, accountNumber, employeeNumber, bankId, branchId }, { models }) => {
      const bankAccount = await models.BankAccount.findById(id);
      const newBankAccount = await bankAccount.update({
        accountHolderName,
        employeeName,
        accountType,
        accountNumber,
        employeeNumber,
        bankId,
        branchId
      });

      pubsub.publish(EVENTS.BANK_ACCOUNT.UPDATED, {
        bankAccountUpdated: { bankAccount: newBankAccount },
      });

      return newBankAccount;
    },
    
    deleteBankAccounts: async (parent, { ids }, { models }) => {
      return await models.BankAccount.destroy({ where: { id: { $in: ids } } });
    },

    deleteBankAccount: async (parent, { id }, { models }) => {
      return await models.BankAccount.destroy({ where: { id } });
    },
  },

  BankAccount: {
    bank: async (bankAccount, args, { loaders }) => {
      return await loaders.bank.load(bankAccount.bankId);
    },
    branch: async (bankAccount, args, { loaders }) => {
      return await loaders.branch.load(bankAccount.branchId);
    },
  },

  Subscription: {
    bankAccountCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.BANK_ACCOUNT.CREATED),
    },
    bankAccountUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.BANK_ACCOUNT.UPDATED),
    }
  },
};
