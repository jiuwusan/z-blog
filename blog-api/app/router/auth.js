module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    //管理端
    router.post('/auth/token', controller.auth.token);
    router.post('/auth/refreshToken', controller.auth.refreshToken);
    router.post('/auth/changePassword', authenticate(), controller.auth.changePassword);
};