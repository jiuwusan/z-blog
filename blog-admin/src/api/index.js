import config from '@config';
import ApiGenerator from '@jws/api/ApiGenerator';
import { notification } from 'antd';
import { history } from 'umi';
//缓存数据
let apiState = {};
export const updateApiState = (newState = {}) => {
    apiState = {
        ...apiState,
        ...newState
    }
    console.log("##更新Api成功##");
};


const genApi = new ApiGenerator(config.apiPrefix, {
    format: (res) => {
        console.log("format==", res);
        switch (res.code) {
            case 200:
                return res.data;
            case 7401:
                history.replace("/login");
                break;
            case 7402:
                history.replace("/login");
                break;
            case 7403:
                history.replace("/login");
                break;
        }
        notification.error({
            message: "系统提示",
            description: res.msg
        });
        throw res;
    },
    //拦截器
    interceptors: (options) => {
        let { token } = apiState;
        if (!options.outAuth) {
            token && (options.headers.Authorization = token.access_token);
        }
        return options;
    },
    onError: (error) => {
        console.log("请求错误==", error);
    }
}).genApi;

// 查询类型的用 MERGE  提交类型的用BREAK

// 用户相关api
export const authApi = genApi({
    login: {
        url: "/auth/token",
        method: "POST",
        serialize: "form",
        outAuth: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Basic WlktQmxvZzp6aG91eXVhbjIwMDI="
        }
    },
    logout: 'GET /auth/logout',
    imageCode: 'GET /auth/imageCode'
});

export const fileApi = genApi({
    upload: {
        url: "/upload/:folder",
        method: "POST",
        outAuth: true
    }
});

export const configApi = genApi({
    profile: "POST /admin/config/profile",
    findById: "/admin/config/findById"
});

export const diaryApi = genApi({
    save: "POST /admin/diary/save",
    findById: "/admin/diary/findById",
    pageQuery: "POST /admin/diary/pageQuery",
    delById: "POST /admin/diary/delById",
});

export const linkApi = genApi({
    save: "POST /admin/link/save",
    findById: "/admin/link/findById",
    pageQuery: "POST /admin/link/pageQuery",
    delById: "POST /admin/link/delById",
});

export const messageApi = genApi({
    audit: "POST /admin/message/audit",
    reject: "POST /admin/message/reject",
    pageQuery: "POST /admin/message/pageQuery",
    delById: "POST /admin/message/delById",
    findById: "/admin/message/findById",
    reply: "POST /admin/message/reply"
});