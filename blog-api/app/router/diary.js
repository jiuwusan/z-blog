module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/diary/save', authenticate(), controller.admin.diary.save);
    router.get('/admin/diary/findById', authenticate(), controller.admin.diary.findById);
    router.post('/admin/diary/pageQuery', authenticate(), controller.admin.diary.pageQuery);
    router.post('/admin/diary/delById', authenticate(), controller.admin.diary.delById);
    // C端
    router.post('/custom/diary/allQuery', controller.custom.diary.allQuery);
};