'use strict';

//node.js 文件操作对象
const fs = require('fs');
const path = require('path');
//egg.js Controller
const Controller = require('egg').Controller;

class UploadController extends Controller {

    /**
     * 上传图片
     */
    async save() {
        const { ctx, app } = this;
        //将传入参数的 '_' 转换为 '/'
        let folder = (ctx.params.folder || "").replace(/\_/g, "/");
        let imageDir = await ctx.service.tools.getUploadDir(folder);
        const parts = ctx.multipart({ autoFields: true });
        let retPath = [];
        let part;
        //parts() 返回 promise 对象
        while ((part = await parts()) != null) {
            if (part.length) {
                continue;
            } else {
                if (!part.filename) continue;
                // 处理文件流
                let file = {};
                file.name = part.filename;
                file.type = part.mimeType;
                let saveFileName = (await app.utils.uuid.v5()) + part.filename.substring(part.filename.lastIndexOf("."));
                let filePath = path.join(imageDir.fullDir, saveFileName); // 保存路径
                let relFilePath = imageDir.lastDir + saveFileName; // 相对路径
                let writable = fs.createWriteStream(filePath);// 创建写入流
                await part.pipe(writable) // 开始写入
                retPath.push(relFilePath);
                console.log("imageDir==", { filePath, relFilePath });
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