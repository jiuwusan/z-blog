'use strict';
const path = require('path');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //挂载utils
  app.loader.loadToApp(        //将utils模块 挂载到 app 上
    path.join(app.baseDir, "app/utils"),    // 规范化生成的路径
    "utils",
    {
      caseStyle: 'lower',//小写    this.app.模块名.小写方法名   调用
      ignore: 'test.js',//忽略 test.js 文件   这里配置 你需要忽略的文件  被忽略的文件 将不能通过 this.app.模块名.方法  访问
    }
  );

  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动,同步模型到数据库
    await app.model.sync({ alter: true });
  });

  const { router, controller } = app;
  //Auth相关
  app.all('/auth/token', app.oAuth2Server.token());

  router.get('/auth/imageCode', controller.auth.imageCode);
  //文件
  router.post('/upload/:folder', controller.upload.save);
  /**********管理端***************************************************************************************************/
  router.get('/', controller.home.index);
  //系统配置
  router.post('/admin/config/create', app.oAuth2Server.authenticate(), controller.admin.config.create);
  router.post('/admin/config/profile', app.oAuth2Server.authenticate(), controller.admin.config.profile);
  router.get('/admin/config/findById', app.oAuth2Server.authenticate(), controller.admin.config.findById);

  //分类相关
  router.post('/admin/classify/create', app.oAuth2Server.authenticate(), controller.admin.classify.create);
  /**********管理端***************************************************************************************************/


  /**********客户端***************************************************************************************************/
  //配置
  router.get('/custom/config/findById', controller.custom.config.findById);

  /**********客户端***************************************************************************************************/
};
