const { HttpException } = require("../core/http-exception");
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 已知信息 errorCode是自己定义的
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.code;
    }
    ctx.body = {
      message: error
    };
  }
};
module.exports = catchError;
