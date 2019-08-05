const { Sequelize, Model } = require("sequelize");
const { db } = require("../../core/db");
const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER(10),
  title: Sequelize.STRING,
  type: Sequelize.INTEGER(10)
};
class Moive extends Model {}
Moive.init(
  {
    ...classicFields
  },
  {
    sequelize: db,
    tablename: "moive",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ["updated_at", "deleted_at", "created_at"]
        }
      }
    }
  }
);
Moive.sync();
class Sentence extends Model {}
Sentence.init(
  { ...classicFields },
  {
    sequelize: db,
    tablename: "sentence",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ["updated_at", "deleted_at", "created_at"]
        }
      }
    }
  }
);
Sentence.sync();
class Music extends Model {}
Music.init(
  {
    url: Sequelize.STRING,
    ...classicFields
  },
  {
    sequelize: db,
    tablename: "music",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ["updated_at", "deleted_at", "created_at"]
        }
      }
    }
  }
);
Music.sync();
module.exports = {
  Music,
  Sentence,
  Moive
};
