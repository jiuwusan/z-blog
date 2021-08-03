const Service = require('egg').Service;
class ModelService extends Service {

    /**
     * 查询全部
     */
    async allQuery(querySql, replacements, options) {
        const { ctx, app } = this;
        let datalist = await ctx.model.query(querySql,
            { replacements, raw: true, type: app.Sequelize.QueryTypes.SELECT, ...options });
        return datalist;
    }

    /**
     * 分页查询
     */
    async pageQuery(querySql, replacements, page = 1, pageSize = 10, orderBy = '', options) {
        const { ctx, app } = this;

        let countSql = `SELECT count(*) as total FROM (${querySql}) as t_count_all`;
        let datacount = await ctx.model.query(countSql,
            { replacements, raw: true, type: app.Sequelize.QueryTypes.SELECT, ...options });
        let pageSql = `${querySql} ${orderBy} LIMIT :offset, :limit`;
        replacements.offset = (page - 1) * pageSize;
        replacements.limit = pageSize;
        let datalist = await ctx.model.query(pageSql,
            { replacements, raw: true, type: app.Sequelize.QueryTypes.SELECT, ...options });
        return {
            page,
            pageSize,
            totalSize: datacount[0].total,
            datalist
        };
    }


}

module.exports = ModelService;
