import React, { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
const Root = (props) => {
    let { init } = useAuth();
    useState(() => {
        init();
    })
    return props.children;
};

export function rootContainer(container) {
    return React.createElement(Root, null, container);
}