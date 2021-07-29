const node_uuid = require('uuid');
const crypto = require('crypto');
const uuid = {
    //验证必填项
    async v1(num = 1) {
        let uids = [];
        for (var i = 0; i < num; i++) {
            uids.push((await node_uuid.v1()).replace(/\-/g, ""));
        }
        return uids.length > 1 ? uids : uids.join("");
    },
    //验证必填项
    async v4(num = 1) {
        let uids = [];
        for (var i = 0; i < num; i++) {
            uids.push((await node_uuid.v4()).replace(/\-/g, ""));
        }
        return uids.length > 1 ? uids : uids.join("");
    },
    /**
     * 随机+时间戳
     * @param {*} num 
     * @returns 
     */
    async v5(num = 1) {
        let uids = [];
        let uuid;
        for (var i = 0; i < num; i++) {
            uuid = (await node_uuid.v4()).replace(/\-/g, "") + Date.now();
            uuid = crypto.createHash('md5').update(uuid).digest("hex");
            uids.push(uuid);
        }
        return uids.length > 1 ? uids : uids.join("");
    }
}

module.exports = uuid;