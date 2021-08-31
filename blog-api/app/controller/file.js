'use strict';

//node.js 文件操作对象
const fs = require('fs');
const path = require('path');
const BaseController = require('../core/base');

//文件类型映射关系
const contentTypeMap = {
    png: "image/png",
    jpeg: "image/jpeg",
    mp4: "video/mpeg4"
};

class FileController extends BaseController {

    /**
     * 读取图片
     */
    async common() {
        const { ctx, service } = this;
        let { uid, fileName, folder, suffix } = this.validate({
            uid: "uid 不能为空",
            suffix: "suffix 不能为空",
            folder: "folder 不能为空"
        });
        let filePath = `/auth/${folder}/${uid}.${suffix}`;
        fileName = (fileName ? `${fileName}.${suffix}` : "") || filePath.substring(filePath.lastIndexOf('/') + 1);
        let lastPath = service.tools.getLastDir(filePath);

        ctx.attachment(fileName);
        ctx.set('Content-Type', contentTypeMap[suffix]);
        ctx.body = fs.createReadStream(lastPath);
    }

}

module.exports = FileController;