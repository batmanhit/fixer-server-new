const uuid = require('uuid');

const branch = (sequelize, DataTypes) => {
  var Branch = sequelize.define('branch',  {
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
    tableName: 'branches',
    timestamps: false,
    underscored: true,
  });

  return Branch;
};

export default branch;
