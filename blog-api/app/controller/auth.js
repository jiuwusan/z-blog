'use strict';

const BaseController = require('../core/base');

class AuthController extends BaseController {

    /**
     * 图形验证码
     */
    async imageCode() {
        const svgCaptcha = require('svg-captcha');
        const { ctx, app, config } = this;
        let { lastkey } = this.validate({});
        if (lastkey) {
            await ctx.service.redis.del(lastkey);
        }
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
        await ctx.service.redis.set(key, code, config.auth.imgCodeTime);

        this.result({
            base64: imgbase64,
            key: key
        });

    }

    /**
     * 获取token
     */
    async token() {
        const { ctx, app } = this;
        let params = this.validate({
            grant: "授权方式为必填项"
        });
        let token;
        switch (params.grant) {
            case "password":
                token = await ctx.service.auth.password(params);
                break;
        }
        this.result(token);
    }

    /**
     * 获取token
     */
    async changePassword() {
        const { ctx,app, service } = this;
        let { oldPassword, newPassword, rePassword, imageCode } = this.validate({
            oldPassword: "缺少参数 oldPassword",
            newPassword: "缺少参数 newPassword",
            rePassword: "缺少参数 rePassword"
        });
        //图形验证码
        await service.auth.valiImageCode(imageCode);
        //旧密码
        let uid = await service.auth.getUserUid();
        let user = await service.auth.getUser({ uid });
        if (user.password !== await app.utils.tools.MD5(oldPassword, user.salt)) {
            this.error("密码错误");
        }
        //新密码
        if (newPassword !== rePassword) {
            this.error("新密码不一致");
        }

        await ctx.model.User.update({ password: await app.utils.tools.MD5(newPassword, user.salt) }, { where: { uid } });
        //清除本次token，
        await service.auth.offToken();
        this.result();
    }

    /**
     * 刷新token
     */
    async refreshToken() {

    }
}

module.exports = AuthController;