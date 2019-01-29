'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false  
    },
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
    },
    picture: {
      type: DataTypes.BLOB
    }
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
