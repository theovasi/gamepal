'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      member1Id: {
        type: Sequelize.INTEGER
      },
      member2Id: {
        type: Sequelize.INTEGER
      },
      member3Id: {
        type: Sequelize.INTEGER
      },
      member4Id: {
        type: Sequelize.INTEGER
      },
      member5Id: {
        type: Sequelize.INTEGER
      },
      member6Id: {
        type: Sequelize.INTEGER
      },
      member7Id: {
        type: Sequelize.INTEGER
      },
      member8Id: {
        type: Sequelize.INTEGER
      },
      member9Id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teams');
  }
};