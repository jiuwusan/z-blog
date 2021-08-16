const Service = require('egg').Service;
class AuthService extends Service {

    /**
     * 获取唯一标识
     */
    async getUserUid() {
        const { ctx, app } = this;
        let accessToken = ctx.request.headers.authorization;
        if (!accessToken) {
            throw {
                message: "用户未登录",
                code: 7401
            };
        }

        let tokenInfo = await ctx.service.redis.get(accessToken);
        if (!tokenInfo) {
            throw {
                message: "登录已过期，令牌已失效",
                code: 7403
            };
        }
        return tokenInfo.uid;
    }

    /**
     * 获取用户
     * @param {*} query 
     * @returns 
     */
    async getUser(query) {
        const { ctx, app } = this;
        if (app.utils.validator.isEmpty(query)) {
            throw "参数错误"
        }
        let user = await this.ctx.model.User.findOne({ where: query });
        if (!user) {
            throw {
                message: "用户不存在",
                code: 7001
            };
        }
        return user;
    }

    /**
     * 密码登录
     * @param {*} params 
     */
    async password(params) {
        const { app, ctx, service } = this;
        //验证必要参数
        app.utils.validator.validate({
            imageCode: "图形验证码为必填项",
            username: "用户名为必填项",
            password: "密码为必填项"
        }, params);
        let { username, password, imageCode } = params;
        await service.imageCode.validate(imageCode);
        let user = await this.getUser({ username });
        if (user.password !== await app.utils.tools.MD5(password, user.salt)) {
            throw {
                message: "密码错误",
                code: 7003
            };;
        }
        let expires_in = 60 * 60 * 2;
        let access_token = await app.utils.uuid.v5();
        let refresh_token = await app.utils.uuid.v5();
        //存token
        await ctx.service.redis.set(access_token, { uid: user.uid, roles: ["system"] }, expires_in);
        await ctx.service.redis.set(refresh_token, user.uid, 60 * 60 * 24 * 7);

        return {
            access_token,
            expires_in,
            refresh_token
        }
    }

    async offToken(accessToken) {
        const { ctx, app } = this;
        accessToken = accessToken || ctx.request.headers.authorization;
        if (!accessToken) {
            throw "token令牌不存在或已失效";
        }
        //删除key
        await ctx.service.redis.del(accessToken);

        return true;
    }
}

module.exports = AuthService;
