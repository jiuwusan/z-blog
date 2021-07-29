import axios from 'axios';
//合并请求的api回调
const apiLocks = {};

/**
 * 定义请求
 * @param {*} options 参数
 * @param {*} config 配置
 * @returns 
 */
function request(options = {}) {
    const { data = {} } = options;
    //进行加锁，防止数据多次提交
    let key = options.url + JSON.stringify(data);
    if (apiLocks[key]) {
        return Promise.reject({ msg: '请不要重复操作' });
    }
    apiLocks[key] = true;

    return new Promise((resolve, reject) => {
        axios({
            timeout: 60000,
            ...options
        }).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        }).finally(() => {
            delete apiLocks[key];
        });
    });
}

export default request;