'use strict';

const BaseController = require('../core/base');

class AuthController extends BaseController {

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
        await service.imageCode.validate(imageCode);
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