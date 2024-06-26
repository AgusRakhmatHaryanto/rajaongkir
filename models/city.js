'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsTo(models.Province, { foreignKey: 'provinceId', as: 'province' })

    }
  }
  City.init({
    name: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    provinceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};