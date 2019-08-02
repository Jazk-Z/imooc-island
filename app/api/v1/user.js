const { RegisterValidator } = require("../../validators/validator");
const Router = require("koa-router");
const User = require("../../models/user");
const router = new Router({ prefix: "/v1/user" });

router.post("/register", async ctx => {
  const v = await new RegisterValidator().validate(ctx);
  const user = {
    email: v.get("body.email"),
    password: v.get("body.password2"),
    nickname: v.get("body.nickname")
  };
  const result = await User.create(user);
  ctx.body = result;
});

module.exports = router;
