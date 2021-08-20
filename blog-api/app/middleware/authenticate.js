module.exports = options => {
    return async function authenticate(ctx, next) {
        await ctx.service.auth.getUserUid();
        await next();
    };
};