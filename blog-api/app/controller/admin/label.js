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
            res = await ctx.model.Label.update(saveData, { where: { uid } });
        } else {
            res = await ctx.model.Label.create(saveData);
        }
        this.result(res);
    }

    /**
     * 查询列表
     */
    async query() {
        const { service } = this;
        let querySql = `select t.uid as value,t.name as label from label t where t.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }
}

module.exports = ClassifyController;