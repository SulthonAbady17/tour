'use strict';
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Transaction.hasOne(DetailTransaction);
      // DetailTransaction.belongsTo(models.Transaction, {
      //   foreignKey: 'transactionId',
      //   as: 'transaction'
      // });
      // models.Transaction.hasMany(models.Tour, {
      //   through: 'DetailTransaction'
      // })

      // models.Tour.BelongsToMany(models.Transaction, {
      //   through: 'DetailTransaction'
      // })
      DetailTransaction.belongsTo(models.Transaction)
      DetailTransaction.belongsTo(models.Tour)
    }
  }
  DetailTransaction.init({
    transactionId: {
      type: DataTypes.UUID
    },
    tourId: {
      type: DataTypes.UUID
    },
  }, {
    sequelize,
    modelName: 'DetailTransaction',
  });
  return DetailTransaction;
};