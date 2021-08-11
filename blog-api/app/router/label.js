module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/label/save', authenticate(), controller.admin.label.save);
    router.post('/admin/label/query', authenticate(), controller.admin.label.query);
    router.post('/admin/label/delById', authenticate(), controller.admin.label.delById);
    router.post('/admin/label/pageQuery', authenticate(), controller.admin.label.pageQuery);
    //C端
    router.post('/custom/label/query', controller.custom.label.query);
};