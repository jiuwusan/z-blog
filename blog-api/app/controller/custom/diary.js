'use strict';

const BaseController = require('../../core/base');

class DiaryController extends BaseController {

    /**
     * 查询列表
     */
    async query() {
        const { service } = this;
        let querySql = `select d.*,DATE_FORMAT(d.created_at,'%Y-%m-%d') as datetime from diary d where d.deleted='00' order by d.created_at desc`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }


}

module.exports = DiaryController;