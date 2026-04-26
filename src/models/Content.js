const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Content = sequelize.define("Content", {
  title: DataTypes.STRING,
  subject: DataTypes.STRING,
  filePath: DataTypes.STRING,

  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },

  rejectionReason: DataTypes.STRING,

  startTime: DataTypes.DATE,
  endTime: DataTypes.DATE,

  duration: DataTypes.INTEGER,
  orderIndex: DataTypes.INTEGER,
});

module.exports = Content;