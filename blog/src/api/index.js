import { ApiGenerator } from '@jws';
import config from '@config';

const apiv1 = new ApiGenerator(config.apiPrefix, { //异常处理
    onError: (error) => {
        console.log("请求错误==", error);
    },
    format: (res) => {
        if (res.status === 200) {
            if (res.data.code === 200) {
                return res.data.data;
            } else {
                throw new Error(res);
            }
        } else {
            throw new Error(res)
        }
    }
});

export const configApi = apiv1.genApi({
    findById: "/custom/config/findById"
});

export const diaryApi = apiv1.genApi({
    query: "post /custom/diary/query"
});

export const linkApi = apiv1.genApi({
    query: "post /custom/link/query"
});

export const messageApi = apiv1.genApi({
    pageQuery: "post /custom/message/pageQuery",
    save: "post /custom/message/save"
});

export const authApi = apiv1.genApi({
    imageCode: "GET /auth/imageCode"
});