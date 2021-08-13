'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

    /**
     * 返回结果
     * @param {*} data 
     * @param {*} code 
     * @param {*} msg 
     */
    result(data = {}, code = 200, msg = "成功") {
        const { ctx } = this;
        ctx.body = {
            code,
            msg,
            data
        };
    }

    error(message, code, status, errors) {
        let retError = {
            message: message || "系统错误！",
            code: code || -99,
            status: status || 200,
            errors: errors || {}
        };
        throw retError;
    }

    /**
     * 验证
     * @param {*} rules 
     * @param {*} formData 
     * @returns 
     */
    validate(rules, formData) {
        const { ctx, app } = this;
        formData = formData || {
            ...(ctx.params || {}),
            ...(ctx.request.query || {}),
            ...(ctx.request.body || {})
        };
        console.log("验证数据=", formData);
        //开始验证
        app.utils.validator.validate(rules, formData);
        return formData;
    }

    /**
     * 参数
     * @param {*} rules 
     * @param {*} formData 
     */
    genParams(allParams, keys) {
        let params = {};
        for (const key of keys) {
            params[key] = allParams[key];
            switch (Object.prototype.toString.call(allParams[key])) {
                case "[object Array]":
                    params[key] = allParams[key].join(",");
                    break;
                case "[object Object]":
                    params[key] = JSON.stringify(allParams[key]);
                    break;
                default:
                    params[key] = allParams[key];
            }
        }
        return params;
    }

}

module.exports = BaseController;