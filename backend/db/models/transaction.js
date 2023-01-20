'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.User.hasMany(Transaction)
      Transaction.belongsTo(models.User);
      Transaction.belongsToMany(models.Tour, {
        through: 'DetailTransaction'
      })
      Transaction.hasMany(models.DetailTransaction)
      // Transaction.hasOne(models.User, {
      //   foreignKey: 'id'
      // })
      // Transaction.hasOne(models.DetailTransaction);
    }
  }
  Transaction.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    date: DataTypes.DATEONLY,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions'
  });
  return Transaction;
};