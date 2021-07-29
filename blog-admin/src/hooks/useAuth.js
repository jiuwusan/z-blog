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
        if (!result.error) {
            updateApiState({ token: result });
            setToken(result);
            history.replace("/");
        } else {
            //error_description.message
        }
    }

    const logout = async (user) => {
        setToken(null);
        setUserInfo(null);
        history.replace('/login');
    };

    return { token, userInfo, init, login, logout };
};
