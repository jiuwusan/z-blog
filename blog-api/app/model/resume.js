'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1 } = app.Sequelize;

    const Link = app.model.define('resume', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        contact: { type: TEXT, comment: "联系方式" },
        information: { type: TEXT, comment: "基本信息" },
        lcm: { type: TEXT, comment: "详细内容" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Link;
};