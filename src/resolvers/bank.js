export default {
  Query: {
    banks: async (parent, args, { models }) => {
      return await models.Bank.findAll();
    },
    bank: async (parent, { id }, { models }) => {
      return await models.Bank.findById(id);
    }
  }
};
