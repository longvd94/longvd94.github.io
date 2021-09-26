'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExpressMail', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      sender_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      sender_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipients: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: Sequelize.TEXT,    
      attachment: Sequelize.STRING.BINARY,       
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      error_message: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ExpressMail');
  }
};