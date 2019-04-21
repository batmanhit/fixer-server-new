const uuid = require('uuid');

const bank = (sequelize, DataTypes) => {
  var Bank = sequelize.define('bank',  {
    id: {
      type: DataTypes.STRING(60),
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuid.v4()
    },
    name: {
      type: DataTypes.STRING(300),
      validate: { notEmpty: true }
    }
  }, {
    tableName: 'banks',
    timestamps: false,
    underscored: true,
  });

  return Bank;
};

export default bank;
