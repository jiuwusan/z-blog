'use strict';

const BaseController = require('../../core/base');

class ConfigController extends BaseController {

    /**
     * 创建
     */
    async create() {
        const { ctx, app } = this;
        let params = this.validate({
            name: "名称不能为空"
        });

        let config = await ctx.model.Config.create(this.genParams(params, ["name", "remark"]));

        this.result(config);

    }

    /**
     * 配置
     */
    async profile() {
        const { ctx } = this;
        let params = this.validate({
            profile: "请完整填写配置信息",
            uid: "uid不能为空"
        });

        let result = await ctx.model.Config.update(this.genParams(params, ["profile"]), { where: { uid: params.uid } });

        this.result(result);
    }

    /**
     * 查询
     */
    async findById() {
        const { ctx } = this;
        let params = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Config.findOne({ where: { uid: params.uid } });
        if (!result) {
            this.error("数据不存在");
        }
        this.result(result);
    }

}

module.exports = ConfigController;