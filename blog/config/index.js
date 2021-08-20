const dev = require('./dev.env');
const prod = require('./prod.env');
const test = require('./test.env');
const defaultConfig = require('./default.env');

const env = (process.env.BLOG_ENV || process.env.NODE_ENV).trim();

const configMap = {
    development: dev,
    production: prod,
    dev: dev,
    prod: prod,
    test: test,
};

/**
 * 对通过环境变量得到的config进行一次处理
 */
module.exports = (function (config) {
    var devServerProxy = {};
    var index = 0;
    for (var key in config) {
        if (typeof (config[key]) === 'string' && config[key].indexOf("proxy") === 0) {
            var apiPrefix = "/proxy_api_prefix_" + String.fromCharCode(index + 65);
            devServerProxy[apiPrefix] = {
                target: config[key].replace(/proxy/, '').trim(),
                ws: true,
                pathRewrite: {
                    [`^${apiPrefix}`]: ''
                }
            }
            config[key] = apiPrefix;
            index++;
        }
    }
    return { devServerProxy, ...config }
}({
    ...defaultConfig,
    ...configMap[env]
}))
