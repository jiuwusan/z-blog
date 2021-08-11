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
     * 查询单个
     */
    async findById() {
        const { ctx, service } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let querySql = `select t.uid,t.title,t.content,t.type,t.cover,t.adjunct,t.brief,
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
        let querySql = `select t.uid,t.title,t.content,t.type,t.cover,t.adjunct,t.brief,
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
        DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from article t where t.deleted='00' and t.status='10'`;
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
     * 查询置顶文章
     */
    async topQuery() {
        const { ctx, service } = this;
        let querySql = `select t.uid,t.title,
        DATE_FORMAT(t.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from article t where t.deleted='00' and t.status='10' order by t.top asc LIMIT :offset, :limit`;
        let replacements = {
            offset: 0,
            limit: 9
        };
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }



}

module.exports = ArticleController;