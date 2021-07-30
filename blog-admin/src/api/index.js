import config from '@config';
import ApiGenerator from '@jws/api/ApiGenerator';
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
        if (res.code) {
            if (res.code == 200) {
                return res.data;
            } else {
                throw res.msg;
            }
        } else {
            return res;
        }
    },
    //拦截器
    interceptors: (options) => {
        let { token } = apiState;
        if (!options.outAuth) {
            token && (options.headers.Authorization = `${token.token_type} ${token.access_token}`);
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