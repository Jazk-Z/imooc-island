const Koa = require("koa");
const InitManager = require("./core/init");
const app = new Koa();
InitManager.initCore(app);
app.listen(3000, () => console.log("server is starting, port 3000...."));
