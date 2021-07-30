'use strict';

//node.js 文件操作对象
const fs = require('fs');
const path = require('path');
//egg.js Controller
const Controller = require('egg').Controller;

class UploadController extends Controller {

    /**
     * 上传文件，不修改文件名，同名文件会被覆盖
     */
    async save() {
        const { ctx, app } = this;
        console.log("ctx.request.body==",ctx.request.body);
        //将传入参数的 '_' 转换为 '/'
        let folder = (ctx.params.folder || "").replace(/\_/g, "/");
        let imageDir = await ctx.service.tools.getUploadDir(folder);
        const files = ctx.request.files;
        let retPath = [];
        let saveFileName;
        for (const file of files) {
            try {
                let fileStream = fs.readFileSync(file.filepath) //files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
                // 将文件存到指定位置
                saveFileName = (await app.utils.uuid.v5()) + file.filename.substring(file.filename.lastIndexOf("."));
                let filePath = path.join(imageDir.fullDir, saveFileName);
                let relFilePath = imageDir.lastDir + saveFileName;
                fs.writeFileSync(filePath, fileStream);
                retPath.push(relFilePath);
            } finally {
                // remove tmp files and don't block the request's response
                // cleanupRequestFiles won't throw error even remove file io error happen
                ctx.cleanupRequestFiles([file]);
            }
        }
        //文件响应，返回路径
        ctx.body = {
            code: 200,
            msg: "成功",
            data: {
                path: retPath
            }
        };
    }
}

module.exports = UploadController;