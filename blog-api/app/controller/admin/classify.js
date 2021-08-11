'use strict';

const BaseController = require('../../core/base');

class ClassifyController extends BaseController {

    /**
     * 保存
     */
    async save() {
        const { ctx } = this;
        let params = this.validate({
            name: "名称不能为空"
        });
        let saveData = this.genParams(params, ["name", "remark", "cover"]);
        saveData.cover = saveData.cover || `/icon/label/${parseInt(Math.random() * 37)}.svg`;
        let { uid } = params;
        let res;
        if (uid) {
            res = await ctx.model.Classify.update(saveData, { where: { uid } });
        } else {
            res = await ctx.model.Classify.create(saveData);
        }
        this.result(res);
    }

    /**
     * 查询列表
     */
    async query() {
        const { service } = this;
        let querySql = `select t.uid as value,t.name as label from classify t where t.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { service } = this;
        let querySql = `select t.* from classify t where t.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements);
        this.result(result);
    }

    /**
      * 删除
      */
    async delById() {
        const { ctx,service } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let stat = await service.model.queryOne(`select count(*) as total from article_to_class t where t.class_id=:uid`, { uid });
        if (stat.total > 0) {
            this.error("当前分类已关联文章，不能删除！！！");
        }

        let result = await ctx.model.Classify.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = ClassifyController;