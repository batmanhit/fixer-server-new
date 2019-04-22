// Making Branch fetchers as a data loader since they are almost static
export const batchBranches = async (keys, models) => {
  const branches = await models.Branch.findAll({
    where: {
      id: keys,
    },
  });
  return keys.map(key => branches.find(branch => branch.id === key));
};
