'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT,STRING, UUIDV1 } = app.Sequelize;

    const Config = app.model.define('diary', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        image: { type: TEXT, comment: "图片" },
        content: { type: TEXT, comment: "内容" },
        adjunct: { type: TEXT, comment: "附件" },
        overview: { type: TEXT, comment: "概述" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Config;
};