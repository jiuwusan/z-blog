module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/classify/save', authenticate(), controller.admin.classify.save);
    router.post('/admin/classify/query', authenticate(), controller.admin.classify.query);
};