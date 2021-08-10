module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/label/save', authenticate(), controller.admin.label.save);
    router.post('/admin/label/query', authenticate(), controller.admin.label.query);
};