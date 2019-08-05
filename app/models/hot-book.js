const { Sequelize, Model, Op } = require("sequelize");
const { db } = require("../../core/db");
const Favor = require("./favor");
class HootBook extends Model {
  static async getAll(type) {
    const books = await HootBook.findAll({
      order: ["index"]
    });
    const ids = [];
    books.forEach(v => {
      ids.push(v.id);
    });
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        }
      },
      group: ["art_id"],
      attributes: ["art_id", [Sequelize.fn("COUNT", "*"), "count"]]
    });
    console.log(books);
    console.log(favors);
    books.forEach(v => HootBook._getEachBookStatus(v, favors));
    return books;
  }
  static _getEachBookStatus(book, favors) {
    let count = 0;
    favors.forEach(v => {
      if (book.id === v.art_id) {
        count = v.get("count");
      }
    });
    book.setDataValue("count", count);
    return book;
  }
}
HootBook.init(
  {
    index: Sequelize.INTEGER(10),
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
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
HootBook.sync();
module.exports = HootBook;
