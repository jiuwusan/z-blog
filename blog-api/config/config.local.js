'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {

    //获取项目根目录
    const getRootDir = (dir) => {
        let subIndex = dir.lastIndexOf("\\");
        if (subIndex < 0) dir.lastIndexOf("/");
        return dir.substring(0, subIndex);
    }

    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};
    config.resourceDir = `${getRootDir(appInfo.baseDir)}/resource`;
    config.uploadDir = `${config.resourceDir}/upload`;
    //数据库连接配置
    config.sequelize = {
        dialect: 'mysql', // l类型
        host: '101.43.111.57', // 地址
        username: 'root', // 账号
        password: 'ZkD707396', // 密码
        port: 3306, // 端口号
        database: 'z-blog-dev', // 数据库名称
        timezone: '+08:00',//时区
        // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
        underscored: true
    };

    config.static = {
        dir: [
            { prefix: '/fetchfile/', dir: config.resourceDir }
        ]
    }

    return config;
};
