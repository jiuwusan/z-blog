const Service = require('egg').Service;
const fs = require('fs');

class WechatService extends Service {

    /**
     * 获取accessToken
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

    /**
     * 新增永久素材
     * @param {*} media 
     * @param {*} type 
     */
    async addMaterial(filePath, type = "thumb") {
        const { service, app } = this;
        let access_token = await this.getAccessToken();
        let lastPath = service.tools.getLastDir(filePath);
        let url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${access_token}&type=${type}`;
        // let url = `https://jiuwusan.cn/blog-api/upload/wechat_test`;
        let result = await app.utils.tools.post({
            url,
            formData: {
                media: fs.createReadStream(lastPath)
            },
            dataType: "json"
        });

        return result;
    }

    /**
     * 发布文章
     * @param {*} articles 
     */
    async addNews(article) {
        const { ctx } = this;
        let access_token = await this.getAccessToken();
        let url = `https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=${access_token}`;
        const rs = await ctx.curl(url, {
            method: 'POST', // 设置请求方式 默认是GET
            dataType: 'json',
            contentType: 'json',
            data: {
                "articles": [article]
            }
        });

        if (rs && rs.data && rs.data.media_id) {
            return rs.data;
        }

        throw rs.data.errmsg || "系统错误";
    }

}

module.exports = WechatService;