module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/link/save', authenticate(), controller.admin.link.save);
    router.get('/admin/link/findById', authenticate(), controller.admin.link.findById);
    router.post('/admin/link/pageQuery', authenticate(), controller.admin.link.pageQuery);
    router.post('/admin/link/delById', authenticate(), controller.admin.link.delById);
    // C端
    router.post('/custom/link/query', controller.custom.link.query);
};