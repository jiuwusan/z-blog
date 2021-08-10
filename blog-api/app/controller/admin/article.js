'use strict';

const BaseController = require('../../core/base');

class ArticleController extends BaseController {

    /**
     * 发布
     */
    async publish() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Article.update({ status: "10" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 撤回
     */
    async revocat() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Article.update({ status: "99" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 创建
     */
    async save() {
        const { ctx, app } = this;
        let { uid, title, content, cover, type, classify = [], label = [], adjunct = [] } = this.validate({
            content: "缺少参数 content",
            title: "缺少参数 title",
            classify: "缺少参数 classify",
            cover: "缺少参数 cover",
            label: "缺少参数 label",
            type: "缺少参数 type"
        });
        //保存的数据
        let saveData = {
            title, content, cover: cover.join(","), type, adjunct: adjunct.join(",")
        };
        let article;
        if (uid) {
            await ctx.model.Article.update(saveData, { where: { uid } });
        } else {
            article = await ctx.model.Article.create(saveData);
            uid = article.uid;
        }
        //插入分类
        let bulkClass = [];
        for (let i = 0; i < classify.length; i++) {
            bulkClass.push({
                art_id: uid,
                class_id: classify[i],
            });
        }
        await ctx.model.ArticleToClass.destroy({ where: { art_id: uid } });
        await ctx.model.ArticleToClass.bulkCreate(bulkClass);
        //插入标签
        let bulkLabel = [];
        for (let i = 0; i < label.length; i++) {
            bulkLabel.push({
                art_id: uid,
                label_id: label[i],
            });
        }
        await ctx.model.ArticleToLabel.destroy({ where: { art_id: uid } });
        await ctx.model.ArticleToLabel.bulkCreate(bulkLabel);
        this.result();
    }

    /**
     * 查询单个
     */
    async findById() {
        const { ctx, service } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Article.findOne({ where: { uid } });
        if (!result) {
            this.error("数据不存在");
        }
        //查询分类
        let classdata = await await service.model.query(`select t2.* from article_to_class t left join classify t2 on t.class_id=t2.uid where t.art_id=:art_id`, { art_id: uid }) || [];
        let classify = [];
        for (let i = 0; i < classdata.length; i++) {
            classify.push(classdata[i].uid);
        }
        //查询标签
        let labeldata = await await service.model.query(`select t2.* from article_to_label t left join label t2 on t.label_id=t2.uid where t.art_id=:art_id`, { art_id: uid }) || [];
        let label = [];
        for (let j = 0; j < labeldata.length; j++) {
            label.push(labeldata[j].uid);
        }
        this.result({ ...(result.dataValues), classdata, classify, label, labeldata });
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { ctx, service } = this;
        let { page, pageSize, startTime, endTime } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.*,DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from article t where t.deleted='00'`;
        let orderBy = `order by t.created_at desc`
        let replacements = {};
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
        let result = await ctx.model.Article.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = ArticleController;