const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
};
class Classic extends Model {}
Classic.init(
  {
    ...classicFields
  },
  {
    sequelize: db,
    tablename: "user",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true
  }
);
Classic.sync();
module.exports = Classic;
