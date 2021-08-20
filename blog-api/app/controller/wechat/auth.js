'use strict';

const BaseController = require('../../core/base');

class AuthController extends BaseController {

    /**
     * 响应token
     */
    async signature() {
        const { ctx, app } = this;
        let params = this.validate();
        let token = "JIUWUSANZHOUKAIDONG953520497";
        let { signature, timestamp, nonce, echostr } = params;
        let sortStr = [token, timestamp, nonce].sort().join('')
        let localnature = app.utils.tools.SHA1(sortStr);
        if (localnature === signature) {
            ctx.body = echostr;
        } else {
            ctx.body = false;
        }
    }

}

module.exports = AuthController;