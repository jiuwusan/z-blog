'use strict';

const BaseController = require('../../core/base');

class LinkController extends BaseController {

    /**
     * 查询列表
     */
    async allQuery() {
        const { service } = this;
        let querySql = `select t.* from link t where t.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.allQuery(querySql, replacements);
        this.result(result);
    }


}

module.exports = LinkController;