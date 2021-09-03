'use strict';

const BaseController = require('../../core/base');

class LinkController extends BaseController {

    /**
     * 创建
     */
    async recordSave() {
        const { ctx, app } = this;
        let { uid, name, remark } = this.validate({
            name: "缺少参数 name"
        });
        let saveData = { name, remark };
        let res;
        if (uid) {
            res = await ctx.model.ResumeRecord.update(saveData, { where: { uid } });
        } else {
            saveData.uid = await app.utils.uuid.v5();
            res = await ctx.model.ResumeRecord.create(saveData);
        }
        this.result(res);
    }

    /**
     * 查询单个
     */
    async recordFindById() {
        const { ctx } = this;
        let params = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.ResumeRecord.findOne({ where: { uid: params.uid } });
        if (!result) {
            this.error("数据不存在");
        }
        this.result(result);
    }

    /**
     * 查询列表
     */
    async recordPageQuery() {
        const { ctx, service } = this;
        let { page, pageSize } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.* from resume_record t where t.deleted='00'`;
        let orderBy = ``;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

    /**
     * 删除
     */
    async recordDelById() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.ResumeRecord.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = LinkController;