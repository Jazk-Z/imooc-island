const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
const Art = require("./art");
const uuid = require("uuid/v4");
class Favor extends Model {
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });
    console.log(favor);
    if (favor) {
      throw new global.errs.likeError();
    }
    const t = await db.transaction();
    try {
      const result = await Favor.create(
        {
          art_id,
          type,
          uid
        },
        { transaction: t }
      );
      console.log(result);
      const art = await Art.getData(art_id, type);
      const add = await art.increment("fav_nums", { by: 1, transaction: t });
      await t.commit();
      return add;
    } catch (error) {
      await t.rollback();
      return error;
    }
  }
  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });
    console.log(!favor);
    if (!favor) {
      throw new global.errs.disLikeError();
    }
    console.log(favor);
    const t = await db.transaction();
    try {
      await favor.destroy({
        art_id,
        type,
        uid,
        force: true, // false 软删除
        transaction: t
      });
      const art = await Art.getData(art_id, type);
      const add = await art.decrement("fav_nums", { by: 1, transaction: t });
      await t.commit();
      return add;
    } catch (error) {
      await t.rollback();
      return error;
    }
  }
  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type
      }
    });
    return favor ? true : false;
  }
}
Favor.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuid()
    },
    uid: Sequelize.INTEGER(10),
    art_id: Sequelize.INTEGER(10),
    type: Sequelize.INTEGER(5)
  },
  {
    sequelize: db,
    tablename: "favor",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true
  }
);
Favor.sync();
module.exports = Favor;
