'use strict';

//文章分类
module.exports = app => {
    const { STRING, UUID, TEXT, UUIDV1 } = app.Sequelize;

    const Message = app.model.define('message', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        reply_uid: { type: STRING(36), comment: "被回复uid" },
        content: { type: TEXT, comment: "内容" },
        contact: { type: TEXT, comment: "联系方式" },
        nickname: { type: STRING(255), comment: "昵称" },
        avatar: { type: STRING(255), comment: "头像" },
        status: { type: STRING(2), defaultValue: "20", comment: "状态 10=审核通过，20=待审核" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Message;
};