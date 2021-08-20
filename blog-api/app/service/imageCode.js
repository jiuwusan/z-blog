const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class ImageCodeService extends Service {

    async genCode(aging = 5) {
        const { ctx, app } = this;

        var captcha = svgCaptcha.create({
            // 翻转颜色 
            inverse: false,
            // 字体大小 
            fontSize: 36,
            // 噪声线条数 
            noise: 3,
            // 宽度 
            width: 80,
            // 高度 
            height: 40,
        });
        let code = captcha.text.toLowerCase();
        let imgSvg = String(captcha.data);
        let imgbase64 = "data:image/svg+xml;base64," + Buffer.from(imgSvg).toString('base64');//转换为base64
        let key = await app.utils.uuid.v5();
        await ctx.service.redis.set(key, code, 60 * aging);
        return {
            base64: imgbase64,
            key: key
        }
    }

    /**
     * 验证图形验证码
     */
    async validate(codeStr) {
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
        if (stoCode.toUpperCase() !== codes[1].toUpperCase()) {
            throw {
                message: "图形验证码错误",
                code: 7002
            };
        }
        //删除key
        await ctx.service.redis.del(codes[0])
    }

}

module.exports = ImageCodeService;