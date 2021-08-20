const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class ToolsService extends Service {
    //取值,过滤多余的参数
    async getUploadDir(dirName) {
        const { config, app } = this;
        let dateStr = app.utils.tools.formatTime("yyyyMMdd");
        const uploadPrefix = "/upload";
        if (!app.utils.validator.isEmpty(dirName)) {
            dirName = dirName + '/';
        } else {
            dirName = "";
        }
        const lastDir = `${uploadPrefix}/${dirName}${dateStr}/`;
        const fullDir = path.join(config.uploadDir, dirName, dateStr);
        app.utils.tools.mkdirsSync(fullDir);
        return { lastDir, fullDir };
    }

    /**
     * 递归创建文件夹
     * @param {*} dirname 
     * @returns 
     */
    mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }
}

module.exports = ToolsService;