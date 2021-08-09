'use strict';

//文章分类
module.exports = app => {
    const { STRING, UUID, TEXT, UUIDV1 } = app.Sequelize;

    const Message = app.model.define('message', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        reid: { type: STRING(36), comment: "回复id" },
        pid: { type: STRING(36), comment: "关联的父id" },
        content: { type: TEXT, comment: "内容" },
        contact: { type: STRING(255), comment: "联系方式" },
        nickname: { type: STRING(255), comment: "昵称" },
        avatar: { type: STRING(255), comment: "头像" },
        status: { type: STRING(2), defaultValue: "88", comment: "状态 10=已回复，20=待回复，88=待审核，99=驳回" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Message;
};