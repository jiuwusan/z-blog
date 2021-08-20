module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    router.get('/wechat/auth/signature', controller.wechat.auth.signature);
};