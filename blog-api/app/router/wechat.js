module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    //验证token
    router.get('/wechat/auth/signature', controller.wechat.auth.signature);
    //获取token
    router.get('/wechat/auth/getAccessToken', controller.wechat.auth.getAccessToken);

    router.post('/wechat/material/add', controller.wechat.material.add);
    router.post('/wechat/material/news', controller.wechat.material.news);
};