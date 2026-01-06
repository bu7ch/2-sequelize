'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Auteur.hasMany(models.Livre, {
        foreignKey: 'auteurId',
        as: 'livres'
      })
    }
  }
  Auteur.init({
    name: DataTypes.STRING,
    nationalite: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auteur',
    tableName: 'Auteurs'
  });
  return Auteur;
};