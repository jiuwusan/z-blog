module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/article/save', authenticate(), controller.admin.article.save);
    router.get('/admin/article/findById', authenticate(), controller.admin.article.findById);
    router.post('/admin/article/pageQuery', authenticate(), controller.admin.article.pageQuery);
    router.post('/admin/article/delById', authenticate(), controller.admin.article.delById);
    router.post('/admin/article/publish', authenticate(), controller.admin.article.publish);
    router.post('/admin/article/revocat', authenticate(), controller.admin.article.revocat);
    // C端
    // router.post('/custom/article/query', controller.custom.article.query);
};