const { LinValidator, Rule } = require("../../core/lin-validator-v2");
const User = require("../models/user");
const { LoginType, ArtType } = require("../lib/enum");
class PositiveIntergerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要正整数", { min: 1 })];
  }
}
class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "邮箱格式不正确")];
    this.password1 = [
      new Rule("isLength", "密码至少6个字符，最多32个字符", {
        min: 6,
        max: 32
      }),
      new Rule(
        "matches",
        "密码不符合规范",
        "^(?![0-9]+$)(?![a-zA-Z]+$)([0-9A-Za-z])"
      )
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule("isLength", "昵称不符合规则", {
        min: 4,
        max: 32
      })
    ];
  }
  validatePassword(vals) {
    const pwd1 = vals.body.password1;
    const pwd2 = vals.body.password2;
    if (pwd1 !== pwd2) {
      throw new Error("两次输入密码不相同");
    }
  }
  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (user) {
      throw new Error("email已存在");
    }
  }
}
class TokenValidator extends LinValidator {
  constructor(props) {
    super(props);
    this.account = [
      new Rule("isLength", "不符合账号规则", { min: 4, max: 32 })
    ];
    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "至少六个字符", { min: 6, max: 128 })
    ];
  }
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error("type 是必须参数");
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error("type 参数不合法");
    }
  }
}
class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [new Rule("isLength", "不允许为空", { min: 1 })];
  }
}
function checkType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error("type是必须参数");
  }
  type = type * 1;
  this.parsed.path.type = type;
  if (!LoginType.isThisType(type)) {
    throw new Error("type参数不合法");
  }
}
class Checkr {
  constructor(type) {
    this.enumType = type;
  }
  check(vals) {
    let type = vals.body.type || vals.path.type;
    if (!type) {
      throw new Error("type是必须参数");
    }
    type = type * 1;
    if (!this.enumType.isThisType(type)) {
      throw new Error("type参数不合法");
    }
  }
}
class LikeValidator extends PositiveIntergerValidator {
  constructor() {
    super();
    const checker = new Checkr(ArtType);
    this.validateType = checker.check.bind(checker);
  }
}
class ClassicValidator extends LikeValidator {}
class SearchValidator extends LinValidator {
  constructor() {
    super();
    this.q = [new Rule("isLength", "搜索关键字不能为空", { min: 1, max: 16 })];
    this.start = [
      new Rule("isInt", "start不符合规范", { min: 0, max: 60000 }),
      new Rule("isOptional", "", 0)
    ];
    this.count = [
      new Rule("isInt", "count不符合规范", { min: 1, max: 20 }),
      new Rule("isOptional", "", 20)
    ];
  }
}
class AddShortCommentValidator extends PositiveIntergerValidator {
  constructor() {
    super();
    this.content = [
      new Rule("isLength", "必须在1-24个字符之间", {
        min: 1,
        max: 24
      })
    ];
  }
}
module.exports = {
  PositiveIntergerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator,
  AddShortCommentValidator
};
