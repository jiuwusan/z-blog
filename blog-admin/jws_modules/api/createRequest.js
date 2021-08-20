import { extend } from 'umi-request';

//api锁
const apiLocks = {};
//合并请求的api回调
const apiMergeCallbacks = {};

export default (options, useFuns) => {
    const request = extend({
        timeout: 30000,
        ...options,
    });
    if (useFuns) {
        for (let fun of useFuns) {
            request.use(fun);
            // request.use(async (ctx, next) => {
            //     await next();
            // });
        }
    }
    return (options = {}) => {
        //concurrentMode: merge  有并发则合并成一次请求  break有并发则中断
        let { concurrentMode, ...requestOptions } = options;
        if (concurrentMode) {
            concurrentMode = concurrentMode.toUpperCase();
        }
        let key = options.url + JSON.stringify(requestOptions.params) + JSON.stringify(requestOptions.data);
        if (apiLocks[key]) {
            if (concurrentMode === 'MERGE') {
                return new Promise((resolve, reject) => {
                    let callbacks = apiMergeCallbacks[key] || [];
                    apiMergeCallbacks[key] = callbacks;
                    callbacks.push({ resolve, reject });
                });
            } else if (concurrentMode === 'BREAK') {
                console.error('重复操作:' + key);
                return Promise.reject({ msg: '请不要重复操作' });
            }
        }
        apiLocks[key] = true;
        return request(options.url,requestOptions)
            .then((res) => {
                if (apiMergeCallbacks[key]) {
                    for (let item of apiMergeCallbacks[key]) {
                        item.resolve(res);
                    }
                }
                return res;
            })
            .catch((error) => {
                if (apiMergeCallbacks[key]) {
                    for (let item of apiMergeCallbacks[key]) {
                        item.reject(error);
                    }
                }
                throw error;
            })
            .finally(() => {
                delete apiLocks[key];
                delete apiMergeCallbacks[key];
            });
    };
};
