const { HttpException } = require("../core/http-exception");
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.env === "dev";
    if (isDev && !isHttpException) {
      throw error;
    }
    // 已知信息 errorCode是自己定义的
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        msg: "服务器报错啦~~~~~",
        error_code: 99,
        request: `${ctx.method} ${ctx.path}`,
        error: error
      };
      ctx.status = 500;
    }
  }
};
module.exports = catchError;
