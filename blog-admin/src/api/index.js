import config from '@config';
import ApiGenerator from '@jws/api/ApiGenerator';
import { notification } from 'antd';
import { history } from 'umi';
//缓存数据
let apiState = {};
let lastNotice = { stamp: 0 };
export const updateApiState = (newState = {}) => {
    apiState = {
        ...apiState,
        ...newState
    }
    console.log("##更新Api成功##");
};


const genApi = new ApiGenerator(config.apiPrefix, {
    format: (res) => {
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
        if (lastNotice !== res.msg && (Date.now() - lastNotice.stamp) > 1500) {
            notification.error({
                message: "系统提示",
                description: res.msg
            });
        }
        lastNotice = {
            msg: res.msg,
            stamp: Date.now()
        };
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
    changePassword: 'POST /auth/changePassword',
    imageCode: 'GET /auth/imageCode'
});

export const validApi = genApi({
    imageCode: "GET /valid/imageCode"
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
    findById: "/admin/config/findById",
    profileById: "/admin/profile/findById"
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

export const classifyApi = genApi({
    save: "POST /admin/classify/save",
    query: "POST /admin/classify/query",
    delById: "POST /admin/classify/delById",
    pageQuery: "POST /admin/classify/pageQuery"
});

export const labelApi = genApi({
    save: "POST /admin/label/save",
    query: "POST /admin/label/query",
    delById: "POST /admin/label/delById",
    pageQuery: "POST /admin/label/pageQuery"
});

export const articleApi = genApi({
    save: "POST /admin/article/save",
    findById: "/admin/article/findById",
    pageQuery: "POST /admin/article/pageQuery",
    delById: "POST /admin/article/delById",
    publish: "POST /admin/article/publish",
    revocat: "POST /admin/article/revocat",
    canceltop: "POST /admin/article/canceltop",
    top: "POST /admin/article/top",
});

export const resumeApi = genApi({
    recordSave: "POST /admin/resume/record/save",
    recordFindById: "/admin/resume/record/findById",
    recordPageQuery: "POST /admin/resume/record/pageQuery",
    recordDelById: "POST /admin/resume/record/delById",
});