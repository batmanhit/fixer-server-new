// Making Bank fetchers as a data loader since they are almost static
export const batchBanks = async (keys, models) => {
  const banks = await models.Bank.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => banks.find(bank => bank.id === key));
};
