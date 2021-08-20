const Service = require('egg').Service;

class ArticleService extends Service {

    /**
     * 发送短信验证码
     * @param {*} PhoneNumbers 
     * @param {*} code 
     */
    async log(uid, ip) {
        try {
            const { ctx } = this;
            ip = ip || ctx.request.ip;
            if (ip && uid) {
                let result = await ctx.model.ArticleLog.findOne({ where: { art_id: uid, ip } });
                if (!result) {
                    await ctx.model.ArticleLog.create({ art_id: uid, ip });
                } else if (result && ((Date.now() - new Date(result.created_at).getTime()) > 8 * 60 * 60 * 1000)) {
                    await ctx.model.ArticleLog.create({ art_id: uid, ip });
                }
            }
        } catch (error) {
            console.log("出错--", error);
        }
    }


}

module.exports = ArticleService;