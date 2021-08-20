'use strict';

//node.js 文件操作对象
const fs = require('fs');
const path = require('path');
const BaseController = require('../core/base');

class UploadController extends BaseController {

    /**
     * 上传文件，不修改文件名，同名文件会被覆盖
     */
    async save() {
        const { ctx, app } = this;
        let params = this.validate();
        //是否对文件重命名
        let noren = params.noren;
        //将传入参数的 '_' 转换为 '/'
        let folder = (params.folder || "").replace(/\_/g, "/");
        let imageDir = await ctx.service.tools.getUploadDir(folder);
        const files = ctx.request.files;
        let retPath = [];
        let saveFileName, fileStream, filePath, relFilePath;
        for (const file of files) {
            console.log("file==", file);
            try {
                fileStream = fs.readFileSync(file.filepath) //files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
                // 将文件存到指定位置
                saveFileName = file.filename;
                if ((noren + "") !== "1") {
                    saveFileName = (await app.utils.uuid.v5()) + file.filename.substring(file.filename.lastIndexOf("."));
                }
                filePath = path.join(imageDir.fullDir, saveFileName);
                relFilePath = imageDir.lastDir + saveFileName;
                fs.writeFileSync(filePath, fileStream);
                // fs.colse();
                retPath.push(relFilePath);
            } finally {
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