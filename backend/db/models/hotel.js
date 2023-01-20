"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Tour)
    }
  }
  Hotel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Hotel",
      tableName: "Hotels"
    }
  );
  return Hotel;
};
