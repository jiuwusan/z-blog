'use strict';

//文章分类
module.exports = app => {
    const { STRING, UUID, UUIDV1, TEXT } = app.Sequelize;

    const Article = app.model.define('article', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        title: { type: STRING(500), comment: "标题" },
        content: { type: TEXT, comment: "文章" },
        type: { type: STRING(255), comment: "类型" },
        cover: { type: STRING(255), comment: "封面" },
        adjunct: { type: STRING(500), comment: "附件" },
        status: { type: STRING(2), defaultValue: "99", comment: "上架状态 10=上架中，99=下架中" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Article;
};