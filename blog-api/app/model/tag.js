'use strict';

//文章分类
module.exports = app => {
    const { STRING, UUID,UUIDV1 } = app.Sequelize;

    const Tag = app.model.define('tag', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        name: { type: STRING(255), comment: "名称" },
        remark: { type: STRING(1024), comment: "描述" },
        cover: { type: STRING(255), comment: "封面" }
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Tag;
};