'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    config.resourceDir = "/usr/local/workspace/resource";
    config.uploadDir = "/usr/local/workspace/resource/upload";

    //数据库连接配置
    config.sequelize = {
        dialect: 'mysql', // l类型
        host: 'rm-j6cp1150r5d5xp0nc.mysql.rds.aliyuncs.com', // 地址
        username: 'zhoukaidong', // 账号
        password: 'ZkD707396', // 密码
        port: 3306, // 端口号
        database: 'zy-blog', // 数据库名称
        timezone: '+08:00',//时区
        // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
        underscored: true
    };

    return config;
};
