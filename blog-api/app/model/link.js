'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1 } = app.Sequelize;

    const Link = app.model.define('link', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        link: { type: TEXT, comment: "链接" },
        logo: { type: TEXT, comment: "图片" },
        name: { type: TEXT, comment: "内容" },
        desc: { type: TEXT, comment: "描述" },
        remark: { type: TEXT, comment: "备注" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Link;
};