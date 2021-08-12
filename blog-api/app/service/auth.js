const Service = require('egg').Service;
const CryptoJS = require('crypto-js');
class AuthService extends Service {

    /**
     * 获取唯一标识
     */
    async getUid() {
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
     * 验证图形验证码
     */
    async valiImageCode(codeStr) {
        const { ctx, app } = this;
        let codes = codeStr.split("_");
        if (!codes[1]) {
            throw "图形验证码为必填项"
        }
        let stoCode = await ctx.service.redis.get(codes[0]);
        if (app.utils.validator.isEmpty(stoCode)) {
            throw {
                message: "图形验证码不存在或已过期",
                code: 7001
            };
        }
        if (stoCode !== codes[1]) {
            throw {
                message: "图形验证码错误",
                code: 7002
            };
        }
        //删除key
        await ctx.service.redis.del(codes[0])
    }

    /**
     * 密码登录
     * @param {*} params 
     */
    async password(params) {
        const { app, ctx } = this;
        //验证必要参数
        app.utils.validator.validate({
            imageCode: "图形验证码为必填项",
            username: "用户名为必填项",
            password: "密码为必填项"
        }, params);
        let { username, password, imageCode } = params;
        await this.valiImageCode(imageCode);
        let user = await this.getUser({ username });
        if (user.password !== CryptoJS.MD5(password + user.salt).toString().toUpperCase()) {
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
}

module.exports = AuthService;
