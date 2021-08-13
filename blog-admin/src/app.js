import React, { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useProfile from '@/hooks/useProfile';
const Root = (props) => {
    const { init } = useAuth();
    const [config, initProfile] = useProfile();
    useState(() => {
        //获取配置文件
        initProfile();
        //初始化授权信息
        init();
    })
    return props.children;
};

export function rootContainer(container) {
    return React.createElement(Root, null, container);
}