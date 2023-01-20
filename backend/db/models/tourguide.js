"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TourGuide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TourGuide.hasMany(models.Tour)
    }
  }
  TourGuide.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "TourGuide",
      tableName: "TourGuides",
    }
  );
  return TourGuide;
};
