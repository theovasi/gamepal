'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    friendly: {
      type: DataTypes.INTEGER
    },
    gteammate: {
      type: DataTypes.INTEGER
    },
    helpful: {
      type: DataTypes.INTEGER
    },
    timesRated: {
      type: DataTypes.INTEGER
    },
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, {as: 'user'});
    Rating.belongsTo(models.User, {as: 'ratedUser'});
    Rating.belongsTo(models.Match, {as: 'match'});
  };
  return Rating;
};
