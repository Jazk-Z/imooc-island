const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
class Flow extends Model {}
Flow.init(
  {
    index: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    artId: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize: db,
    tablename: "flow",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true
  }
);
Flow.sync();
module.exports = Flow;
