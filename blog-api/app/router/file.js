module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    //文件
    router.post('/upload/:folder', controller.upload.save);
};