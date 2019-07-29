const Router = require("koa-router");
const router = new Router({ prefix: "/v1/classic" });
const { ParameterException } = require("../../../core/http-exception");
router.get("/latest", (ctx, next) => {
  const error = new ParameterException();
  throw error;
});
module.exports = router;
