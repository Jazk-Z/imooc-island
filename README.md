## koa 为什么一定要使用 async await

- 为了保证洋葱模型 next 加 await
- 线程在 await 的时候 继续去执行下一步代码

## api 版本 业务变动

- 支持三个版本 api 携带版本号
- 策略
  - 路径
  - 查询参数
  - header

## 开闭原则 修改关闭 扩展开发

## 上层调用下层 下层调用上层不合适

## 程序捕捉的异常 不应该直接返回到客户端

- HTTP Status Code 2xx 4xx 5xx
- message 文字性描述
- error_code 开发者自己定义
- request_url

## 错误分类（监听错误 输出有意义的信息）

- 已知性错误 参数类型错误
  - 处理明确错误
- 未知性错误 程序潜在的错误 无意识 不知道哪里出错了

## Koa 中间件只会初始化一次

## js 序列化问题 怎么实现

## node 循环导入是个问题 需要注意

```js
// a.js
const a = require("./b");
// b.js
const b = require("./a");
```

## 索引不要用 %key 之类的 要用 key%

## JSON.stringify(obj)

```js
JSON.stringify()调用obj toJSON的方法
obj = {
    toJSON: () => {console.log(2)}
}
```

## 自动 无感知刷新令盘
