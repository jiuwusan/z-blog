'use strict';

const BaseController = require('../../core/base');

class LinkController extends BaseController {

    /**
     * 查询列表
     */
    async query() {
        const { service } = this;
        let querySql = `select t.* from link t where t.deleted='00'`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }


}

module.exports = LinkController;