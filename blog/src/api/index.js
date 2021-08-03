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
    allQuery: "post /custom/diary/allQuery"
});