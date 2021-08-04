'use strict';

const BaseController = require('../../core/base');

class ClassifyController extends BaseController {

    /**
     * 保存
     */
    async create() {
        const { ctx } = this;
        let params = this.validate({
            name: "名称不能为空"
        });
        let saveData = this.genParams(params, ["name", "remark", "cover"]);
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
    async allQuery() {
        const { service } = this;
        let querySql = `select c.* as datetime from classify c where c.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.allQuery(querySql, replacements);
        this.result(result);
    }
}

module.exports = ClassifyController;