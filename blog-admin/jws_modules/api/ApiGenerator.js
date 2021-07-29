import createRequest from './createRequest';
import { parse, compile } from 'path-to-regexp';
import qs from 'qs';

/**
 * 重构接口url，解决接口动态路由参数
 * 
 * @param {*} url 
 * @param {*} data 
 */
function refactorUrl(url = "", params = {}) {
    let dataType = Object.prototype.toString.call(params);
    let data = params;
    try {
        switch (dataType) {
            case "[object Object]":
                break;
            case "[object FormData]":
                data = {};
                for (let entry of params.entries()) {
                    data[entry[0]] = entry[1];
                }
                break;
            default:
                return url;
        }
        //重构url
        let domain = '';
        let pathname = url;
        const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
        if (urlMatch) {
            [domain] = urlMatch;
            pathname = url.slice(domain.length);
        }
        pathname = compile(pathname)(data);

        url = domain + pathname;
        return url;

    } catch (e) {
        throw new Error("重构接口url失败");
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
        options.method = "GET";
        options.url = optionsArray[0];
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

    const apiFun = (data = {}, headers = {}) => {
        console.log("request==", data);
        //重构参数
        options.url = refactorUrl(options.url, data);
        options.headers = { ...options.headers, ...headers };
        options.data = data;
        //拦截器
        if (apiConfig.interceptors && typeof apiConfig.interceptors === 'function') {
            let newOptions = apiConfig.interceptors(options);
            newOptions && (options = newOptions);
        }

        //如果是GET请求，拼接URL
        (options.method.toLowerCase() === "get") && (options.params = options.data);

        //JSON转序列化
        switch (options.serialize) {
            case "form":
                options.data = qs.stringify(options.data);
                break;
        }
        //请求开始
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
        this.request = cusRequest || createRequest();
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