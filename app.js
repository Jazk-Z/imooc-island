const Koa = require("koa");
const book = require("./api/v1/book");
const classic = require("./api/v1/classic");
const app = new Koa();

app.use(classic.routes());
app.use(book.routes());
app.use(classic.allowedMethods());
app.use(book.allowedMethods());
app.listen(3000, () => console.log("server is starting, port 3000...."));
