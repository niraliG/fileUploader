"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      googleId: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey : true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps : false
    }
  );
  return User;
};
