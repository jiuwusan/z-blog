import { useState } from 'react';
import { authApi, updateApiState } from '@/api';
import { history } from 'umi';
import useGlobalState from '@jws/hooks/useGlobalState';
export default () => {
    let [token, setToken] = useGlobalState("ACCESS_TOKEN", { storage: 'local' });
    let [userInfo, setUserInfo] = useGlobalState("ACCESS_USERINFO", { storage: 'local' });

    const init = () => {
        if (token) {
            updateApiState({ token });
        }
    };

    //登录方法
    const login = async (params) => {
        console.log("开始登录=", params);
        let result = await authApi.login(params);
        updateApiState({ token: result });
        setToken(result);
        history.replace("/");
    }

    const logout = async (flag) => {
        if (flag) {
            //调用退出接口
        }
        setToken(null);
        setUserInfo(null);
        history.replace('/login');
    };

    const password = async (params,callback) => {
        await authApi.changePassword(params);
        callback&&callback();
        logout();
    }

    return { token, userInfo, init, login, password, logout };
};
