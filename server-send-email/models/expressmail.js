'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpressMail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ExpressMail.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    sender_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sender_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: DataTypes.TEXT,    
    attachment: DataTypes.STRING.BINARY,       
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    error_message: DataTypes.TEXT 
  }, {
    sequelize,
    modelName: 'ExpressMail',
    freezeTableName: true,
  });
  return ExpressMail;
};