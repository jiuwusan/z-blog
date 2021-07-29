module.exports = options => {
  return async function reqfilter(ctx, next) {
    let requestPath = ctx.request.path;
    console.info("正在访问：", requestPath);
    //当前路径存在于白名单，不需要验证token
    // if (await ctx.service.auth.aoneReq(requestPath)) {
    //   await next();
    // } else {
    //   //验证token，是否符合
    //   let token = ctx.request.headers.authorization;
    //   await ctx.service.auth.verifyToken(token);
    //   await ctx.service.auth.verifyFunction(token, requestPath);
    //   await next();
    // }
    await next();
  };
};