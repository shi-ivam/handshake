'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoices.init({
    title: DataTypes.STRING,
    creator: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    billingAddress: DataTypes.JSON,
    items: DataTypes.JSON,
    total: DataTypes.FLOAT,
    status:{
      type:DataTypes.STRING,
      defaultValue:'pending'
    },
    id:{
      type:DataTypes.STRING,
      primaryKey:true
    },
    description:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Invoices',
    tableName:'Invoices'
  });
  return Invoices;
};