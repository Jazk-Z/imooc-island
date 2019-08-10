const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
class Comment extends Model {
  static async addComment(bookId, content) {
    const comment = await Comment.findOne({
      where: {
        content,
        book_id: bookId
      }
    });
    if (!comment) {
      return await Comment.create({
        book_id: bookId,
        content,
        nums: 1
      });
    } else {
      return await comment.increment("nums", { by: 1 });
    }
  }
  static async getComment(bookId) {
    return await Comment.findAll({
      where: {
        book_id: bookId
      }
    });
  }
  // 不能传参
  toJSON() {
    return {
      content: this.getDataValue("content"),
      nums: this.getDataValue("nums")
    };
  }
}
Comment.init(
  {
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER(10),
      defaultValue: 0
    },
    book_id: Sequelize.INTEGER(10)
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
Comment.sync();
module.exports = Comment;
