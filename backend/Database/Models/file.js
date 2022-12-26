"use strict";
module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define(
    "file",
    {
      id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "file",
      tableName: "file",
      timestamps : false
    }
  );
  return file;
};
