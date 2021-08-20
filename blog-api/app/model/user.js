'use strict';

//用户
module.exports = app => {
  const { STRING, DATE, UUID, UUIDV1 } = app.Sequelize;

  const User = app.model.define('user', {
    uid: { type: UUID, primaryKey: true, defaultValue: UUIDV1, comment: "唯一标识" },//唯一标识
    username: { type: STRING(255), comment: "账号" },//账号
    password: { type: STRING(255), comment: "密码" },//密码
    nickname: { type: STRING(255), comment: "用户昵称" },//用户昵称
    realname: { type: STRING(50), comment: "真实姓名" },//真实姓名
    email: { type: STRING(50), comment: "用户邮箱" },//用户邮箱
    phone: { type: STRING(50), comment: "手机号码" },//手机号码
    avatar: { type: STRING(100), comment: "头像路径" },//头像路径
    salt: { type: STRING(20), comment: "盐加密" },//盐加密
    remark: { type: STRING(500), comment: "备注" },//备注
    login_at: { type: DATE, comment: "最后登录时间" },//最后登录时间
    create_by: { type: STRING(50), comment: "创建者" },//创建者
    update_by: { type: STRING(50), comment: "更新者" },//更新者
    deleted: { type: STRING(2), comment: "删除标记" },//删除
  }, {
    //防止查询在表名后加s
    freezeTableName: true,
    //是否自动创建create_at
    timestamps: true
  });

  return User;
};