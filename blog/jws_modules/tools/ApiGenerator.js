import createRequest from './request';
import { parse, compile } from 'path-to-regexp';

/**
 * 格式化数据
 * @param {*} data 
 */
function formatData(data = {}) {
    //便利JSON
    for (const key in data) {
        if (Object.prototype.toString.call(data[key]) === '[object Function]') {
            let temp = data[key]();
            delete data[key];
            if (temp) {
                data[key] = temp;
            }
        }
    }
    return data;
}

/**
 * 重构接口url，解决接口动态路由参数
 * 
 * @param {*} url 
 * @param {*} data 
 */
function refactorUrl(url = "", data = {}) {
    let cloneData = JSON.parse(JSON.stringify(data));
    try {
        let domain = ''
        const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
        if (urlMatch) {
            [domain] = urlMatch;
            url = url.slice(domain.length);
        }

        const match = parse(url)
        url = compile(url)(data)
        for (const item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name];
            }
        }
        url = domain + url
    } catch (e) {
        throw new Error("重构接口url失败");
    }
    return { url, data: cloneData };
}

/**
 * 深度合并JSON
 * 遇到相同元素级属性，以（minor）为准 // 不返还新Object，而是main改变
 * @param {*} minor 
 * @param {*} main 
 */
function objectDeepMerge(minor, main) {
    for (var key in minor) {
        if (main[key] === undefined) { // 不冲突的，直接赋值 
            main[key] = minor[key];
            continue;
        }
        // 冲突了，如果是Object，看看有么有不冲突的属性
        // 不是Object 则以（minor）为准为主，
        let target = minor[key];
        if ((typeof target == "object" && target.constructor == Object) || (Object.prototype.toString.call(target) == '[object Array]')) { // arguments.callee 递归调用，并且与函数名解耦 
            //arguments.callee(minor[key], main[key]);
            objectDeepMerge(minor[key], main[key]);
        } else {
            main[key] = minor[key];
        }
    }
}

/**
 * 构建方法
 * @param {*} request 
 * @param {*} serverUrl 
 * @param {*} requestOptions 
 * @param {*} apiConfig 
 * @returns 
 */
function gen(request, serverUrl, requestOptions, apiConfig) {
    let options = {};
    if (Object.prototype.toString.call(requestOptions) === '[object String]') {
        //拆分
        const optionsArray = requestOptions.split(' ');
        if (optionsArray.length === 2) {
            options.method = optionsArray[0];
            options.url = optionsArray[1];
        }
    } else if (Object.prototype.toString.call(requestOptions) === '[object Object]') {
        options = requestOptions;
    }

    if (!options.url.startsWith('https://') && !options.url.startsWith('http://')) {
        options.url = serverUrl + options.url;
    }

    const apiFun = (data = {}, customOption = {}) => {

        //重写参数
        data = {
            ...(apiConfig.params || {}),
            ...(data || {})
        }

        //重写header
        if (options.headers || apiConfig.headers) {
            options.headers = {
                ...(apiConfig.headers || {}),
                ...(options.headers || {})
            }
        }

        //如果参数中存在函数，执行一次函数，并重新赋值
        data = formatData(data);
        options.headers = formatData(options.headers);

        let refactorData = refactorUrl(options.url, data);
        options.data = refactorData.data;
        options.url = refactorData.url;

        //合并option
        objectDeepMerge(customOption, options);

        //拦截器
        if (apiConfig.interceptors && typeof apiConfig.interceptors === 'function') {
            let newOptions = apiConfig.interceptors(options);
            newOptions && (options = newOptions);
        }

        //如果是GET请求，拼接URL
        (options.method.toLowerCase() === "get") && (options.params = options.data);

        //根据contentType转换data类型
        let contentType = (options?.headers || {})["content-type"];
        if (contentType === "application/x-www-form-urlencoded" || contentType === "mutipart/form-data") {
            const formData = new FormData();
            for (let key in options.data) {
                formData.append(key, options.data[key]);
            }
            options.data = formData;
        }

        return request(options).then((res) => {
            let result = res;
            //对数据进行格式化
            apiConfig.format && (result = apiConfig.format(res));
            return result;
        }).catch((err) => {
            apiConfig.onError && apiConfig.onError(err);
            throw err;
        });
    }
    apiFun.apiName = options.url;
    //数据提交格式
    return apiFun;
}


class ApiGenerator {

    constructor(serverUrl, apiConfig, cusRequest) {
        if (Object.prototype.toString.call(apiConfig) === '[object Function]') {
            let temp = cusRequest;
            cusRequest = apiConfig;
            apiConfig = temp;
        }
        this.serverUrl = serverUrl;
        this.request = cusRequest || createRequest;
        this.genApi = this.genApi.bind(this);
        this.updateApiConfig = this.updateApiConfig.bind(this);
        //默认配置
        this.apiConfig = apiConfig || {
            //拦截器
            interceptors: null,
            //异常处理
            onError: null,
            //对结果进行统一处理
            format: null,
            //添加header
            headers: null,
            //参数
            params: null
        }
    }

    genApi(apiList) {
        const API = {};
        if (Object.prototype.toString.call(apiList) === '[object Object]') {
            for (const key in apiList) {
                const api = apiList[key];
                API[key] = gen(this.request, this.serverUrl, api, this.apiConfig);
                API[key].isNewVersion = true; //区分老版本接口
            }
        }
        return API;
    }

    updateApiConfig(config = {}) {
        this.apiConfig = {
            ...this.apiConfig,
            ...config
        };
    }
}

export default ApiGenerator;