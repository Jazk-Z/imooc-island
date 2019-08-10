const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
const axios = require("axios");
const util = require("util");
const Favor = require("./favor");
class Book extends Model {
  constructor(id) {
    super();
    this.id = id;
  }
  async getDetail() {
    const url = util.format(global.config.yushu.detailUrl, this.id);
    const detail = await axios.get(url);
    return detail.data;
  }
  static async searchFromYuShu(q, start, count, summary = 1) {
    const url = util.format(
      global.config.yushu.keywordUrl,
      encodeURI(q),
      count,
      start,
      summary
    );
    const detail = await axios.get(url);
    return detail.data;
  }
  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    });
    return count;
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
