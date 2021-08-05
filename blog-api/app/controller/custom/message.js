'use strict';

const BaseController = require('../../core/base');

class MessageController extends BaseController {

    /**
     * 创建
     */
    async save() {
        const { ctx, service } = this;
        let params = this.validate({
            imageCode: "缺少参数 code",
            content: "缺少参数 content",
            contact: "缺少参数 contact"
        });
        await service.auth.valiImageCode(imageCode);
        let saveData = this.genParams(params, ["content", "contact", "nickname"]);
        saveData.avatar = `/avatar/${parseInt(Math.random() * 8)}.svg`;
        let res = await ctx.model.Message.create(saveData);
        this.result(res);
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { ctx, service } = this;
        let { page, pageSize } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.* from message t where t.deleted='00' and t.status='10'`;
        let orderBy = `order by t.created_at desc`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }


}

module.exports = MessageController;