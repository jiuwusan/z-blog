import { useRef, useEffect, useState, useCallback } from 'react';
export function useWillMount(cb) {
    useState(cb);
}

export function useMount(cb) {
    return useEffect(cb, []);
}

export function useUpdate(cb, deps) {
    const mounting = useRef(true);
    return useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            cb && cb();
        }
    }, deps);
}

export function useUnmount(cb) {
    return useEffect(() => cb, []);
}

export function useForceUpdate() {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    return forceUpdate;
}
