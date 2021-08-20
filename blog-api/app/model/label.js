'use strict';

//文章分类
module.exports = app => {
    const { STRING, UUID, UUIDV1 } = app.Sequelize;

    const Label = app.model.define('label', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        name: { type: STRING(255), comment: "名称" },
        remark: { type: STRING(255), comment: "描述" },
        cover: { type: STRING(255), comment: "封面" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Label;
};