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

  require('./router/diary')(app);
  require('./router/auth')(app);
  require('./router/file')(app);
  require('./router/config')(app);
  require('./router/classify')(app);
  require('./router/link')(app);
  require('./router/message')(app);
  require('./router/label')(app);
  require('./router/article')(app);
  require('./router/valid')(app);
};
