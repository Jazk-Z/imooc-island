const Router = require("koa-router");
const router = new Router({ prefix: "/v1/classic" });
router.get("/latest", (ctx, next) => {
  console.log(1111);
  ctx.body = {
    status: "success"
  };
});
module.exports = router;
