const uuid = require('uuid');

const bankAccount = (sequelize, DataTypes) => {
  var BankAccount = sequelize.define('bank_account',  {
    id: {
      type: DataTypes.STRING(60),
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuid.v4()
    },
    accountHolderName: DataTypes.STRING(300),
    employeeName: DataTypes.STRING(300),
    accountType: DataTypes.ENUM('Savings', 'Checking'),
    accountNumber: {
      type: DataTypes.STRING(7),
      validate: {
        isNumeric: true,
        len: 7
      }
    },
    employeeNumber: {
      type: DataTypes.STRING(15),
      validate: {
        isNumeric: true,
        len: 15
      }
    }
  }, {
    tableName: 'bank_accounts',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: false,
    underscored: true,
  });

  BankAccount.associate = function (models) {
    BankAccount.belongsTo(models.Bank, {
      foreignKey: 'bankId',
      as: 'bank'
    });
    BankAccount.belongsTo(models.Branch, {
      foreignKey: 'branchId',
      as: 'branch'
    });
  };

  return BankAccount;
};

export default bankAccount;
