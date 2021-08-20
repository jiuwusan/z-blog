module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/message/audit', authenticate(), controller.admin.message.audit);
    router.post('/admin/message/reject', authenticate(), controller.admin.message.reject);
    router.post('/admin/message/pageQuery', authenticate(), controller.admin.message.pageQuery);
    router.post('/admin/message/delById', authenticate(), controller.admin.message.delById);
    router.get('/admin/message/findById', authenticate(), controller.admin.message.findById);
    router.post('/admin/message/reply', authenticate(), controller.admin.message.reply);
    // C端
    router.post('/custom/message/pageQuery', controller.custom.message.pageQuery);
    router.post('/custom/message/save', controller.custom.message.save);
};