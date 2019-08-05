const Router = require("koa-router");
const Auth = require("../../../middlewares/auth");
const router = new Router({ prefix: "/v1/like" });
const { LikeValidator } = require("../../validators/validator");
const Favor = require("../../models/favor");
router.post("/", new Auth(3).m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, { id: "art_id" });
  const result = await Favor.like(
    v.get("body.art_id"),
    v.get("body.type"),
    ctx.auth.uid
  );
  ctx.body = { result };
});
router.post("/cancel", new Auth(3).m, async (ctx, next) => {
  console.log(`---------------->`);
  const v = await new LikeValidator().validate(ctx, { id: "art_id" });
  const result = await Favor.disLike(
    v.get("body.art_id"),
    v.get("body.type"),
    ctx.auth.uid
  );
  ctx.body = {
    result
  };
});
module.exports = router;
