module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/classify/save', authenticate(), controller.admin.classify.save);
    router.post('/admin/classify/query', authenticate(), controller.admin.classify.query);
    router.post('/admin/classify/delById', authenticate(), controller.admin.classify.delById);
    router.post('/admin/classify/pageQuery', authenticate(), controller.admin.classify.pageQuery);
    //C端
    router.post('/custom/classify/query', controller.custom.classify.query);
};