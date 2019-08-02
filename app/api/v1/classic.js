const Router = require("koa-router");
const router = new Router({ prefix: "/v1/classic" });
const { ParameterException } = require("../../../core/http-exception");
const { PositiveIntergerValidator } = require("../../validators/validator");
const Auth = require("../../../middlewares/auth");
router.get("/latest", new Auth(10).m, async (ctx, next) => {
  // const id = ctx.params.id;
  // const v = await new PositiveIntergerValidator().validate(ctx);
  // console.log(v);
  // const error = new ParameterException();
  // throw error;
  ctx.body = ctx.auth;
});
module.exports = router;
