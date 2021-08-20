import { defineConfig } from 'umi';
import routes from './src/routes';
import path from 'path';
import config from './config';
//路径
let pathConfig = {
  base: '/blog-admin/',
  publicPath: '/blog-admin/',
  outputPath: './dist/blog-admin'
};
export default defineConfig({
  ...pathConfig,
  hash:true,
  headScripts: [{ src: `${pathConfig.publicPath}ckeditor.js` }, { src: `${pathConfig.publicPath}ck-zh-cn.js` }],
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  chainWebpack: (_config) => {
    return _config;
  },
  //服务器代理
  proxy: {
    '/public/upload': {
      'target': 'http://127.0.0.1:9532/public/upload',
      'changeOrigin': true,
      'pathRewrite': { '^/public/upload': '' },
    },
    ...config.devServerProxy
  },
  alias: {
    '@jws': path.resolve(__dirname, './jws_modules'),
    '@config': path.resolve(__dirname, './config')
  }
});
