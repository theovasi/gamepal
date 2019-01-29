'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
    Match.belongsTo(models.Team, {as: 'team1'});
    Match.belongsTo(models.Team, {as: 'team2'});
    Match.belongsTo(models.Game, {as: 'game'});
  };
  return Match;
};
