module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    //验证性接口
    router.get('/valid/imageCode', controller.valid.imageCode);
    router.post('/valid/smsCode', controller.valid.smsCode);
};