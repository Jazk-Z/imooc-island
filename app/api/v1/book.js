const Router = require("koa-router");
const router = new Router({ prefix: "/v1/book" });
const HotBook = require("./../../models/hot-book");
const Book = require("./../../models/book");
const Auth = require("../../../middlewares/auth");
const Favor = require("./../../models/favor");
const Comment = require("./../../models/book_comment");
const {
  PositiveIntergerValidator,
  SearchValidator,
  AddShortCommentValidator
} = require("@v");
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
router.get("/search", async (ctx, next) => {
  const v = await new SearchValidator().validate(ctx);
  const symmary = await Book.searchFromYuShu(
    v.get("query.q"),
    v.get("query.start"),
    v.get("query.count")
  );
  ctx.body = symmary;
});
router.get("/favor/count", new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = {
    count
  };
});
router.get("/:book_id/favor", new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: "book_id"
  });
  const bookId = v.get("path.book_id");
  const result = await Favor.getBookFavor(ctx.auth.uid, bookId);
  ctx.body = result;
});
router.post("/add/short_comment", async (ctx, next) => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: "book_id"
  });
  const result = await Comment.addComment(
    v.get("body.book_id"),
    v.get("body.content")
  );
  ctx.body = { result };
});
router.get("/:book_id/short_comment", async (ctx, next) => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: "book_id"
  });
  const result = await Comment.getComment(v.get("path.book_id"));
  ctx.body = { result };
});
module.exports = router;
