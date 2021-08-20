'use strict';

const BaseController = require('../../core/base');

class ClassifyController extends BaseController {

    /**
     * 查询列表
     */
    async query() {
        const { service } = this;
        let querySql = `select t.uid ,t.name,t.cover from classify t where t.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }


}

module.exports = ClassifyController;