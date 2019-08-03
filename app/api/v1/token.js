const Router = require("koa-router");
const router = new Router({ prefix: "/v1/token" });
const {
  TokenValidator,
  NotEmptyValidator
} = require("../../validators/validator");
const { LoginType } = require("../../lib/enum");
const User = require("../../models/user");
const { generateToken } = require("../../../core/util");
const Auth = require("../../../middlewares/auth");
const WXManager = require("../../services/wx.js");
router.post("/", async (ctx, next) => {
  let token;
  const v = await new TokenValidator().validate(ctx);
  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get("body.account"), v.get("body.secret"));
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get("body.account"));
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new global.errs.ParameterException("没有相应的登录方式");
      break;
  }
  ctx.body = {
    token
  };
});
router.post("/verify", async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get("body.token"));
  ctx.body = {
    result
  };
});
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  const token = generateToken(user.id, Auth.USER);
  return token;
}
module.exports = router;
