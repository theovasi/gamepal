'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    raterId: DataTypes.INTEGER,
    rateeId: DataTypes.INTEGER,
    friendly: DataTypes.INTEGER,
    gteammate: DataTypes.INTEGER,
    helpful: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};