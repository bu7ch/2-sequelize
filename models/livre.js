'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Livre.belongsTo(models.Auteur, {
        foreignKey: 'auteurId',
        as : 'auteur'
      })
    }
  }
  Livre.init({
    titre: DataTypes.STRING,
    anneePublication: DataTypes.INTEGER,
    auteurId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Livre',
  });
  return Livre;
};