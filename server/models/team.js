'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    member1Id: DataTypes.INTEGER,
    member2Id: DataTypes.INTEGER,
    member3Id: DataTypes.INTEGER,
    member4Id: DataTypes.INTEGER,
    member5Id: DataTypes.INTEGER,
    member6Id: DataTypes.INTEGER,
    member7Id: DataTypes.INTEGER,
    member8Id: DataTypes.INTEGER,
    member9Id: DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};