module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    //管理端
    router.post('/admin/config/create', authenticate(), controller.admin.config.create);
    router.post('/admin/config/profile', authenticate(), controller.admin.config.profile);
    router.get('/admin/config/findById', authenticate(), controller.admin.config.findById);

    //客户端
    router.get('/custom/config/findById', controller.custom.config.findById);
};