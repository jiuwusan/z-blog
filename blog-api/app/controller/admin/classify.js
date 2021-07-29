'use strict';

const BaseController = require('../../core/base');

class ClassifyController extends BaseController {

    /**
     * 创建
     */
    async create() {

        this.result({
            cid: "123"
        });

    }
}

module.exports = ClassifyController;