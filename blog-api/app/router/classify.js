module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/classify/create', authenticate(), controller.admin.classify.create);
};