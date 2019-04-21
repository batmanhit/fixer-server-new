export default {
  Query: {
    branches: async (parent, args, { models }) => {
      return await models.Branch.findAll();
    },
    branch: async (parent, { id }, { models }) => {
      return await models.Branch.findById(id);
    }
  }
};
