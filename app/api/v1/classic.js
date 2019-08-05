const Router = require("koa-router");
const router = new Router({ prefix: "/v1/classic" });
const { ParameterException } = require("../../../core/http-exception");
const {
  PositiveIntergerValidator,
  ClassicValidator
} = require("../../validators/validator");
const Auth = require("../../../middlewares/auth");
const Flow = require("@models/flow");
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
router.get("/:index/next", new Auth(1).m, async (ctx, next) => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: "index"
  });
  const index = v.get("path.index");
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  });
  if (!flow) {
    throw new global.errs.NotFound();
  }
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
router.get("/:index/previous", new Auth(1).m, async (ctx, next) => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: "index"
  });
  const index = v.get("path.index");
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  });
  if (!flow) {
    throw new global.errs.NotFound();
  }
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
router.get("/:type/:id", new Auth(1).m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get("path.id");
  const type = v.get("path.type") * 1;
  const { art, likeLatest } = await new Art(id, type).getDetail(ctx.auth.uid);
  ctx.body = {
    art
  };
});
router.get("/:type/:id/favor", new Auth(1).m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get("path.id");
  const type = v.get("path.type") * 1;
  const { art, likeLatest } = await new Art(id, type).getDetail(ctx.auth.uid);
  ctx.body = {
    like_status: likeLatest,
    fav_nums: art.fav_nums
  };
});
router.get("/favor", new Auth(1).m, async (ctx, next) => {
  const uid = ctx.auth.uid;
  const result = await Favor.getMyClassicFavors(uid);
  ctx.body = {
    result
  };
});
module.exports = router;
