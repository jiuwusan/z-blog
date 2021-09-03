module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/resume/record/save', authenticate(), controller.admin.resume.recordSave);
    router.get('/admin/resume/record/findById', authenticate(), controller.admin.resume.recordFindById);
    router.post('/admin/resume/record/pageQuery', authenticate(), controller.admin.resume.recordPageQuery);
    router.post('/admin/resume/record/delById', authenticate(), controller.admin.resume.recordDelById);

};