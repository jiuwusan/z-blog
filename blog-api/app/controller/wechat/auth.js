'use strict';

const BaseController = require('../../core/base');

class AuthController extends BaseController {

    /**
     * 响应token
     */
    async signature() {
        const { ctx, app } = this;
        let params = this.validate();
        let { signature, timestamp, nonce, echostr } = params;
        let sortStr = [app.config.wechat.token, timestamp, nonce].sort().join('')
        let localnature = app.utils.tools.SHA1(sortStr);
        if (localnature === signature) {
            ctx.body = echostr;
        } else {
            ctx.body = false;
        }
    }

    /**
     * 微信公众号，获取 AccessToken
     */
    async getAccessToken() {
        const { service } = this;
        let accessToken = await service.wechat.getAccessToken();
        this.result({ accessToken });
    }

}

module.exports = AuthController;