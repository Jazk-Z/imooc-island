const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
const axios = require("axios");
const util = require("util");
class Book extends Model {
  constructor(id) {
    super();
    this.id = id;
  }
  async getDetail() {
    const url = util.format(global.config.yushu.detailUrl, this.id);
    const detail = await axios.get(url);
    console.log(detail.data);
    console.log(`-------------->`);
    return detail.data;
  }
}
Book.init(
  {
    id: {
      type: Sequelize.INTEGER(10),
      primaryKey: true
    },
    fav_nums: {
      type: Sequelize.INTEGER(10),
      defaultValue: 0
    }
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
Book.sync();
module.exports = Book;
