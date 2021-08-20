const Service = require('egg').Service;

class WechatService extends Service {

    /**
     * 发送短信验证码
     * @param {*} appid 
     * @param {*} secret 
     */
    async getAccessToken(appid, secret) {
        const { ctx, app } = this;
        appid = appid || app.config.wechat.appId;
        secret = secret || app.config.wechat.appSecret;
        //防止接口频繁调用
        let accessToken = await ctx.service.redis.get(`global_wechat_access_token_${appid}`);
        if (accessToken) {
            return accessToken;
        }
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
        const rs = await ctx.curl(url, {
            method: 'GET', // 设置请求方式 默认是GET
            dataType: 'json',
            // contentType: 'json', // 默认是 form
            data: {}
        });
        if (rs && rs.data && rs.data.access_token) {
            await ctx.service.redis.set(`global_wechat_access_token_${appid}`, rs.data.access_token, rs.data.expires_in - (60 * 5));
            return rs.data.access_token;
        }

        throw rs.data.errmsg || "系统错误";
    }


}

module.exports = WechatService;