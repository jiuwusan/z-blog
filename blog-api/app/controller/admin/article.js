'use strict';

const BaseController = require('../../core/base');

class ArticleController extends BaseController {

    /**
     * 置顶
     */
    async top() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Article.update({ top: "10" }, { where: { uid } });
        this.result(res);
    }

    /**
     * 取消置顶
     */

    async canceltop() {
        const { ctx, app } = this;
        let { uid } = this.validate({
            uid: "缺少参数 uid"
        });
        let res = await ctx.model.Article.update({ top: "99" }, { where: { uid } });
        this.result(res);
    }
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
        let { uid, title, brief, content, cover, type, classify = [], label = [], adjunct = [] } = this.validate({
            content: "缺少参数 content",
            title: "缺少参数 title",
            classify: "缺少参数 classify",
            cover: "缺少参数 cover",
            label: "缺少参数 label",
            type: "缺少参数 type"
        });
        //保存的数据
        let saveData = {
            title, brief, content, cover: cover.join(","), type, adjunct: adjunct.join(",")
        };
        let article;
        if (uid) {
            await ctx.model.Article.update(saveData, { where: { uid } });
        } else {
            saveData.uid = Date.now();
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
        let querySql = `select t.*,
        (SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT('uid',t3.uid,'name',t3.name,'cover',t3.cover)), ']')
        FROM article_to_class t2 
        LEFT JOIN classify t3 ON t3.uid=t2.class_id
        WHERE t2.art_id=t.uid
        ) AS classStr,
        (SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT('uid',t5.uid,'name',t5.name,'cover',t5.cover)), ']')
        FROM article_to_label t4 
        LEFT JOIN label t5 ON t5.uid=t4.label_id
        WHERE t4.art_id=t.uid
        ) AS labelStr,
        DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from article t where t.uid=:uid and t.deleted='00'`;

        let replacements = { uid };

        let result = await await service.model.queryOne(querySql, replacements);
        if (!result) {
            this.error("数据不存在");
        }
        this.result(result);
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { ctx, service } = this;
        let { page, pageSize, title, startTime, endTime } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.*,
        (SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT('uid',t3.uid,'name',t3.name,'cover',t3.cover)), ']')
        FROM article_to_class t2 
        LEFT JOIN classify t3 ON t3.uid=t2.class_id
        WHERE t2.art_id=t.uid
        ) AS classStr,
        (SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT('uid',t5.uid,'name',t5.name,'cover',t5.cover)), ']')
        FROM article_to_label t4 
        LEFT JOIN label t5 ON t5.uid=t4.label_id
        WHERE t4.art_id=t.uid
        ) AS labelStr,
        DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from article t where t.deleted='00'`;
        let orderBy = `order by t.created_at desc`
        let replacements = {};
        if (title) {
            querySql = `${querySql} and t.title like :title`;
            replacements.title = `%${title}%`;
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
        let result = await ctx.model.Article.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

}

module.exports = ArticleController;