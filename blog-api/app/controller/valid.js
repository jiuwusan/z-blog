'use strict';

const BaseController = require('../core/base');

class ValidController extends BaseController {

    /**
     * 图形验证码
     */
    async imageCode() {
        const { ctx, service } = this;
        let { lastkey } = this.validate({});
        if (lastkey) {
            await ctx.service.redis.del(lastkey);
        }
        let data = await service.imageCode.genCode();
        //返回
        this.result(data);
    }

    /**
     * 短息验证码
     */
    async smsCode() {
        const { ctx, service } = this;
        let { lastkey, phoneNumber } = this.validate({
            phoneNumber: "缺少参数 phoneNumber"
        });
        if (lastkey) {
            await ctx.service.redis.del(lastkey);
        }

        let data = await service.alisms.sendCode(phoneNumber);

        this.result(data);

    }

}

module.exports = ValidController;