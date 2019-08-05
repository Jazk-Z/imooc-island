const Router = require("koa-router");
const router = new Router({ prefix: "/v1/book" });
const HotBook = require("./../../models/hot-book");
const Book = require("./../../models/book");
// const Favor = require("./../../models/favor");
const { PositiveIntergerValidator } = require("@v");
router.get("/hot_list", async (ctx, next) => {
  console.log(1111);
  const book = await HotBook.getAll();
  ctx.body = {
    book
  };
});
router.post("/", async (ctx, next) => {
  const params = ctx.request.body;
  const book = await HotBook.create(params);
  ctx.body = {
    book
  };
});
router.get("/:id/detail", async (ctx, next) => {
  const v = await new PositiveIntergerValidator().validate(ctx);
  // console.log(`------------->1`);

  const detail = await new Book(v.get("path.id")).getDetail();
  ctx.body = detail;
});
module.exports = router;
