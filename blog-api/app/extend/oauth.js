'use strict';

const crypto = require('crypto');

//ZY-Blog:zhouyuan2002=>WlktQmxvZzp6aG91eXVhbjIwMDI=

const appSecret = {
    appid: "ZY-Blog",
    secret: "zhouyuan2002"
}

module.exports = app => {
    class OAuth {

        constructor(ctx) {
            this.ctx = ctx;
        }

        async getClient(clientId, clientSecret, ...rest) {
            if (clientId !== 'ZY-Blog' || clientSecret !== 'zhouyuan2002') {
                return;
            }
            return { clientId, clientSecret, grants: ['password'] };
        }

        async getUser(username, password) {
            const { ctx } = this;
            let requestPramas = ctx.request.body;
            console.log("getUser=", requestPramas);
            let user = await this.ctx.model.User.findOne({ where: { username } });
            if (!user) {
                throw {
                    message: "用户不存在",
                    code: 7001
                };
            }
            if (user.password !== crypto.createHash('md5').update(password + user.salt).digest("hex")) {
                throw {
                    message: "密码错误",
                    code: 7002
                };;
            }
            return { id: user.uid, nickname: user.nickname, avatar: user.avatar };
        }

        async saveAuthorizationCode(code, client, user) {

        }
        async getAuthorizationCode(authorizationCode) { }
        async revokeAuthorizationCode(code) { }
        async saveToken(token, client, user) {
            const _token = Object.assign({}, token, { user }, { client });
            await this.ctx.service.redis.set(token.accessToken, _token, 60 * 60 * 2);
            console.log("_token===", _token);
            return _token;
        }
        async getAccessToken(bearerToken) {
            const token = await this.ctx.service.redis.get(bearerToken);
            console.log("验证token，是否符合==", token);
            if (token) {
                token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
                token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
                return token;
            }
            return false;
        }
        async revokeToken(token) { }
    }

    return OAuth;

};