module.exports = options => {
  return async function reqfilter(ctx, next) {
    try {
      await next()
    } catch (err) {
      console.log("抛出异常", err);
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)
      const code = err.code || -99
      const status = err.status || 200
      const message = err.message || '系统错误 ！！！'

      // HTTP Code
      ctx.status = status

      // 生产环境
      const isProd = ctx.app.config.env === 'prod'

      // 错误响应对象
      ctx.body = {
        code: code || -99,
        msg: message || '系统错误 ！！！',
        data: err.errors || {}, // 参数校验未通过
      }
    }
  };
};