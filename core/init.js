const Router = require("koa-router");
const requireDirectory = require("require-directory");
const path = require("path");
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.initLoadConfig();
  }
  static initLoadConfig(paths = "") {
    const configPath = paths || path.resolve(process.cwd(), "config/config.js");
    const config = require(configPath);
    global.config = config;
  }
  static initLoadRouters() {
    requireDirectory(module, path.resolve(process.cwd(), "app/api"), {
      visit: whenLoadModule
    });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes()).use(obj.allowedMethods());
      }
    }
  }
  static loadHttpException() {
    const errors = require("./http-exception");
    global.errs = errors;
  }
}
module.exports = InitManager;
