'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    }
  }, {});
  TeamMember.associate = function(models) {
    // associations can be defined here
    TeamMember.belongsTo(models.User, {as: 'user'});
    TeamMember.belongsTo(models.Team, {as: 'team'});
  };
  return TeamMember;
};
