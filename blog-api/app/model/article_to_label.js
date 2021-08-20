'use strict';

//文章分类
module.exports = app => {
    const { STRING, UUID, UUIDV1, TEXT } = app.Sequelize;

    const ArticleToLabel = app.model.define('article_to_label', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        art_id: { type: STRING(36), comment: "文章id" },
        label_id: { type: STRING(36), comment: "标签id" }
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: false
    });

    return ArticleToLabel;
};