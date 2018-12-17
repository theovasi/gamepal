'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: DataTypes.INTEGER,
    gameTypeId: DataTypes.INTEGER,
    teamId:{
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    }
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
