'use strict';

const BaseController = require('../../core/base');

class MessageController extends BaseController {

    /**
     * 审核
     */
    async audit() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Message.update({ status: "10" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 拒绝
     */
    async reject() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Message.update({ status: "30" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 查询单个
     */
    async findById() {
        const { ctx } = this;
        let params = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Message.findOne({ where: { uid: params.uid } });
        if (!result) {
            this.error("数据不存在");
        }
        this.result(result);
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { ctx, service } = this;
        let { page, pageSize, startTime, endTime } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.*,DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from message t where t.deleted='00'`;
        let orderBy = `order by t.created_at desc`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

    /**
     * 删除
     */
    async delById() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Message.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = MessageController;