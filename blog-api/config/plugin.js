'use strict';

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

// exports.sessionRedis = {
//   enable: true,
//   package: 'egg-session-redis',
// };

/**
 * 开启跨域请求
 */
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.security = {
  xframe: {
    enable: false,
  },
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
