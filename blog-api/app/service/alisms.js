const Service = require('egg').Service;
const SmsCore = require('@alicloud/pop-core');



class SmsService extends Service {

    constructor(p) {
        super(p);
        this.aliSmsClient = new SmsCore({
            accessKeyId: '',
            accessKeySecret: '',
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
    }

    /**
     * 验证短信验证码
     * @param {*} codeStr 
     */
    async validate(codeStr, phoneNumber) {
        const { ctx, app } = this;
        let codes = codeStr.split("_");
        if (!codes.length < 2) {
            throw "短信验证码为必填项"
        }
        let stoData = await ctx.service.redis.get(`${codes[0]}_smscode`);

        if (app.utils.validator.isEmpty(stoData)) {
            throw {
                message: "短信验证码不存在或已过期",
                code: 7001
            };
        }

        if (stoData.phoneNumber !== phoneNumber) {
            throw {
                message: "非法请求，手机号码错误",
                code: 7102
            };
        }

        if (stoData.params.code * 1 !== codes[1] * 1) {
            throw {
                message: "短信验证码错误",
                code: 7002
            };
        }
        //删除key
        await ctx.service.redis.del(`${codes[0]}_smscode`)
    }

    /**
     * 通用发送方法
     * @param {*} phoneNumber 
     * @param {*} TemplateCode 
     * @param {*} params 
     */
    async sendSms(phoneNumber, TemplateCode, params = {}, option = {}) {
        const { app, ctx } = this;
        let { aging = 5 } = option;
        var params = {
            "RegionId": "cn-hangzhou",
            TemplateCode,
            "TemplateParam": JSON.stringify(params),
            "SignName": "九五三",
            PhoneNumbers: phoneNumber
        }
        let key = await app.utils.uuid.v5();
        try {

            await this.aliSmsClient.request('SendSms', params, {
                method: 'POST'
            });

            await ctx.service.redis.set(`${key}_smscode`, { phoneNumber, params }, 60 * aging);

        } catch (error) {
            console.log(JSON.stringify(error));
            throw {
                message: error.data.Message,
                code: 7199
            };
        }

        return {
            key,
            aging
        }
    }

    /**
     * 发送短信验证码
     * @param {*} PhoneNumbers 
     * @param {*} code 
     */
    async sendCode(phoneNumber) {
        var code = "";
        for (var i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10);
        }
        return await this.sendSms(phoneNumber, "SMS_158440394", { code });
    }


}

module.exports = SmsService;