'use strict';

const sequelize = require('./config/sequelize');
const redis = require('./config/redis');
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561434640244_3828';

  // 端口配置
  config.cluster = {
    listen: {
      path: '',
      port: 9532,
      hostname: '0.0.0.0',
    }
  };

  // 过滤器
  config.middleware = ['errorfilter', 'apifilter'];

  // 自定义配置
  const userConfig = {
    name: 'jws-server',
  };

  //数据大小配置
  config.multipart = {
    mode: 'file',
    tmpdir: path.join(appInfo.baseDir, 'tempDir/egg-multipart-tmp'),
    fields: 500,//表单上传字段限制的个数
    fileSize: '4000mb',//文件上传的大小限制
    cleanSchedule: {
      cron: '0 30 3 * * *',//清空临时文件夹
    }
  }

  //数据库连接配置
  config.sequelize = sequelize;

  //redis连接配置
  config.redis = redis;

  //安全配置
  config.security = {
    methodnoallow: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
      headerName: 'x-csrf-token',
      ignoreJSON: false,
    }
  }

  config.cors = {
    origin: "*",
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  }

  //项目根目录路径 "/" 不能少 
  // config.baseDir = appInfo.baseDir + "/";

  config.auth = {
    sysTokenTime: 60 * 60 * 2,//系统用户 30分
    mobTokenTime: 60 * 60 * 24 * 7,//前端用户 一周
    imgCodeTime: 60 * 3,//图形验证码有效时间 3分钟
    anonList: ["/auth/", "/upload/"]
  }

  config.wechat = {
    appId: "wx3da7ad15540aa97d",
    appSecret: "e608e8e40f5b1034f905cc05fa5ec7b4"
  }

  config.oauth2Server = {
    grants: ['password'],
    errorHandler: (ctx, error, response) => {
      console.log('errorHandler==', error);
      ctx.status = 500;
    }
  };

  return {
    ...config,
    ...userConfig,
  };

};
