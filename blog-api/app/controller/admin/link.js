'use strict';

const BaseController = require('../../core/base');

class LinkController extends BaseController {

    /**
     * 创建
     */
    async save() {
        const { ctx, app } = this;
        let params = this.validate({
            link: "缺少参数 link",
            logo: "缺少参数 logo",
            name: "缺少参数 name",
            desc: "缺少参数 desc"
        });
        let saveData = this.genParams(params, ["link", "logo", "name", "desc", "remark"]);
        let { uid } = params;
        let res;
        if (uid) {
            res = await ctx.model.Link.update(saveData, { where: { uid } });
        } else {
            res = await ctx.model.Link.create(saveData);
        }
        this.result(res);
    }

    /**
     * 查询单个
     */
    async findById() {
        const { ctx } = this;
        let params = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Link.findOne({ where: { uid: params.uid } });
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
        let querySql = `select t.* from link t where t.deleted='00'`;
        let orderBy = ``;
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
        let result = await ctx.model.Link.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = LinkController;