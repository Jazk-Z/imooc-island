const Router = require("koa-router");
const router = new Router({ prefix: "/v1/classic" });
const { ParameterException } = require("../../../core/http-exception");
const { PositiveIntergerValidator } = require("../../validators/validator");
const Auth = require("../../../middlewares/auth");
const Flow = require("../../models/flow");
const { Music, Moive, Sentence } = require("../../models/classic");
const Art = require("../../models/art");
const Favor = require("../../models/favor");
router.get("/latest", new Auth(1).m, async (ctx, next) => {
  // const id = ctx.params.id;
  // const v = await new PositiveIntergerValidator().validate(ctx);
  // console.log(v);
  // const error = new ParameterException();
  // throw error;
  const flow = await Flow.findOne({
    order: [["index", "DESC"]]
  });
  const data = await Art.getData(flow.artId, flow.type);
  const likeLatest = await Favor.userLikeIt(
    flow.artId,
    flow.type,
    ctx.auth.uid
  );
  ctx.body = {
    data: {
      ...data.toJSON(),
      index: flow.index,
      likeLatest
    }
  };
});
module.exports = router;
