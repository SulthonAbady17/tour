'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsTo(models.Hotel);
      // models.Hotel.hasMany(Tour)
      Tour.belongsTo(models.Transportation);
      // models.Transportation.hasMany(Tour)
      Tour.belongsTo(models.TourGuide);
      // models.TourGuide.hasMany(Tour)
      Tour.belongsToMany(models.Transaction, {
        through: 'DetailTransaction'
      })
      Tour.hasMany(models.DetailTransaction)
    }
  }
  Tour.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    destination: DataTypes.STRING,
    description: DataTypes.TEXT,
    hotelId: DataTypes.UUID,
    transportationId: DataTypes.UUID,
    tourGuideId: DataTypes.UUID,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour',
    tableName: 'Tours'
  });
  return Tour;
};