'use strict';

const BaseController = require('../../core/base');

class MaterialController extends BaseController {

    /**
     * 添加
     */
    async add() {
        const { ctx, service } = this;
        let { filePath } = this.validate({ filePath: "路径不能为空" });
        let data = await service.wechat.addMaterial(filePath);
        this.result(data);
    }


    /**
     * 发布文章到公众号
     */
    async news() {
        const { ctx, service } = this;
        let { title, cover, author, digest, show_cover_pic, content, content_source_url, need_open_comment, only_fans_can_comment } = this.validate({
            title: "title 不能为空",
            cover: "cover 不能为空",
            show_cover_pic: "show_cover_pic 不能为空",
            content: "content 不能为空",
            content_source_url: "content_source_url 不能为空"
        });
        let { media_id, url } = await service.wechat.addMaterial(cover);
        let thumb_media_id = media_id;

        let data = await service.wechat.addNews({
            title, thumb_media_id, author, digest, show_cover_pic, content, content_source_url, need_open_comment, only_fans_can_comment
        });
        this.result(data);
    }

}

module.exports = MaterialController;