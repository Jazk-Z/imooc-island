const util = require("util");
const axios = require("axios");
const User = require("../models/user");
const { generateToken } = require("../../core/util");
const Auth = require("../../middlewares/auth");
class WXManager {
  static async codeToToken(code) {
    // 小程序 code => 调用微信服务 => openid(唯一表示)
    // 小程序 code（小程序生成） (appid appsecret  小程序)
    const { loginUrl, appid, appSecret } = global.config.wx;
    const url = util.format(loginUrl, appid, appSecret, code);
    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new global.errs.AuthFailed("openId获取失败");
    }
    // 判断微信返回 -1 0 40029 45011
    const errCode = result.data.errorCode;
    const errMsg = result.data.errmsg;
    console.log(result);
    if (errCode && errCode !== 0) {
      throw new global.errs.AuthFailed("openId获取失败:" + errMsg);
    }
    // 获取unionid => sessionid + getUserInfo
    // 拿到openid 建立用户体系openId 不适合做uid
    let user = await User.getUserByOpenid(result.data.openid);
    if (!user) {
      user = await User.registerByOpenid(result.data.openid);
    }
    return generateToken(user.id, Auth.USER);
  }
}
module.exports = WXManager;
