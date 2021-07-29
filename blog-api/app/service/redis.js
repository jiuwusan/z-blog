const Service = require('egg').Service;
class RedisService extends Service {

    /**
     * 存
     * @param {*} key 
     * @param {*} value 
     * @param {*} longtime 
     * @param {*} ttype 
     */
    async set(key, value, longtime, ttype) {
        const { app } = this;
        ttype = ttype || "EX";
        value = JSON.stringify({ value });
        if (longtime) {
            await app.redis.set(key, value, 'EX', longtime);
        } else {
            await app.redis.set(key, value);
        }
    }

    /**
     * 取
     * @param {*} key 
     */
    async get(key) {
        const { app } = this;
        let data = await app.redis.get(key);
        if (!data) {
            return null;
        }
        data = JSON.parse(data);
        return data.value;
    }

    /**
     * 设置key的时长
     * @param {*} key 
     * @param {*} longtime 
     * @param {*} ttype 
     */
    async expire(key, longtime, ttype) {
        const { app, ctx } = this;
        let value = await app.redis.get(key);
        if (value) {
            ctx.service.redis.set(key, value, longtime, ttype);
        } else {
            throw new Error(`redis中不存在key(${key})`);
        }
    }

    /**
     * 删除
     * @param {*} key 
     */
    async del(key) {
        const { app } = this;
        await app.redis.del(key);
    }

    /**
     * 
     */
    async flushall() {
        let { redis } = this.app;
        redis.flushall();
        return;
    }
}

module.exports = RedisService;