'use strict';

//文章浏览日志
module.exports = app => {
    const { STRING, UUID, UUIDV1 } = app.Sequelize;

    const ArticleToLabel = app.model.define('article_log', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        art_id: { type: STRING(36), comment: "文章id" },
        ip: { type: STRING(36), comment: "ip" }
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return ArticleToLabel;
};