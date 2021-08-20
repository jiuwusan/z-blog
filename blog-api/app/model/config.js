'use strict';

//系统配置
module.exports = app => {
    const { STRING, UUID, TEXT, UUIDV1 } = app.Sequelize;

    const Config = app.model.define('config', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        name: { type: STRING(255), comment: "名称" },
        remark: { type: STRING(1024), comment: "描述" },
        profile: { type: TEXT, comment: "配置JSON" },
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Config;
};