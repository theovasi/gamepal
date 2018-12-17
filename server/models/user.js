'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(128),
      allowNull: false,
    }
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
