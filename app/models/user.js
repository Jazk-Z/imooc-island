const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const { db } = require("../../core/db");
class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new global.errs.NotFound("账号不存在");
    }
    const correct = bcrypt.compareSync(plainPassword, user.password);
    if (!correct) {
      throw new global.errs.AuthFailed("密码不正确");
    }
    return user;
  }
  static async getUserByOpenid(openid) {
    const user = User.findOne({
      where: {
        openid
      }
    });
    return user;
  }
  static async registerByOpenid(openid) {
    return await User.create({
      openid
    });
  }
}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        // 10 生成盐的成本
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue("password", psw);
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
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
// User.sync({ force: true });
User.sync();
module.exports = User;
