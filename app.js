const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
  console.log("hello word");
  const result = await next();
  console.log(result);
});
app.use(async (ctx, next) => {
  console.log(2);
  return 1;
});
app.listen(3000, () => console.log("server is starting, port 3000...."));
