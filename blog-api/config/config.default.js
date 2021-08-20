'use strict';

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
    },
    fileExtensions: ['.docx', '.pdf', '.xlsx', '.rar']
  }

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
    appId: "wxa20f5e6a26f5893d",
    appSecret: "1f0b3bfa268ce5a392c9ddc4f3515c75",
    token:"JIUWUSANZHOUKAIDONG953520497"
  }

  /*注意，开启此模式后，应用就默认自己处于反向代理之后，
    会支持通过解析约定的请求头来获取用户真实的 IP，协议和域名。
    如果你的服务未部署在反向代理之后，请不要开启此配置，以防被恶意用户伪造请求 IP 等信息。*/
  config.proxy = true;

  return {
    ...config,
    ...userConfig,
  };

};
