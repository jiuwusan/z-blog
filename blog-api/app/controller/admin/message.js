'use strict';

const BaseController = require('../../core/base');

class MessageController extends BaseController {

    /**
     * 审核
     */
    async audit() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Message.update({ status: "20" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 拒绝
     */
    async reject() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Message.update({ status: "99" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 拒绝
     */
    async reply() {
        const { ctx, app } = this;
        let { uid, pid, content } = this.validate({
            uid: "缺少参数 uid",
            content: "缺少参数 content"
        });

        let saveData = {
            content,
            pid: pid || uid,
            reid: uid,
            nickname: "博主",
            avatar: `/avatar/8.svg`,
            status: '20'
        };

        await ctx.model.Message.create(saveData);
        await ctx.model.Message.update({ status: "10" }, { where: { uid } });
        this.result({});
    }

    /**
     * 查询单个
     */
    async findById() {
        const { service } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let querySql = `select t.*,DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from message t where t.deleted='00' and t.uid=:uid`;
        let replacements = { uid };
        let result = await service.model.queryOne(querySql, replacements);
        if (!result) {
            this.error("数据不存在");
        }
        //查询全部回复
        let replys = await service.model.query(`select t.*,DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from message t where t.deleted='00' and t.pid=:pid`, { pid: result.uid });
        result.replys = replys;
        this.result(result);
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { ctx, service } = this;
        let { page, pageSize, nickname, contact } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.uid,t.avatar,t.status,t.nickname,t.contact,DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from message t where t.deleted='00' and t.reid is null and t.pid is null`;
        let orderBy = `order by t.created_at desc`;
        let replacements = {};

        if (nickname) {
            querySql = `${querySql} and t.nickname like :nickname`;
            replacements.nickname = `%${nickname}%`;
        }

        if (contact) {
            querySql = `${querySql} and t.nickname like :nickname`;
            replacements.contact = `%${contact}%`;
        }

        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

    /**
     * 删除
     */
    async delById() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Message.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = MessageController;