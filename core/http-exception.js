class HttpException extends Error {
  constructor(msg = "服务器异常", errCode = 10000, code = 400) {
    super();
    this.errCode = errCode;
    this.code = code;
    this.msg = msg;
  }
}
class ParameterException extends HttpException {
  constructor(msg, errCode) {
    super();
    this.code = 400;
    this.msg = msg || "参数错误";
    this.errCode = errCode || 10000;
  }
}
module.exports = {
  HttpException,
  ParameterException
};
