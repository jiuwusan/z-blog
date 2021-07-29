import { ApiGenerator } from '@jws';
import config from '@config';

const apiv1 = new ApiGenerator(config.apiPrefix, { //异常处理
    headers: {
        "jws-token": "953953953953",
        "Authorization": () => {
            return Math.random();
        }
    },
    interceptors: (options) => {
        console.log("interceptors==", options);
    },
    onError: (error) => {
        console.log("请求错误==", error);
    }
});

/**
 * 用户相关
 */
export const userApi = apiv1.genApi({
    //登录
    login: 'POST /auth/login',
    //获取签到列表
    getSignDataList: 'POST /mybank/scheme/car/info'
});