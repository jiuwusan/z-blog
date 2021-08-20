'use strict';

const BaseController = require('../../core/base');

class ConfigController extends BaseController {

    /**
     * 配置
     */
    async findById() {
        const { ctx } = this;
        let params = this.validate({
            uid: "uid不能为空"
        });
        let result = await ctx.model.Config.findOne({ where: { uid: params.uid } });
        if (!result) {
            this.error("数据不存在");
        }
        this.result(result);
    }

}

module.exports = ConfigController;