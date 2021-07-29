import styles from './style.less';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { authApi } from '@/api';
export default (props) => {

    //排除value，不需要通过外部传入value
    const { onChange, value, ...rest } = props || {};
    const [code, setCode] = useState("");

    const genImageCode = async () => {
        let result = await authApi.imageCode();
        setCode(result);
    }

    useEffect(() => {
        genImageCode();
    }, [])

    /**
     * 向外传递 value
     * @param {*} val 
     */
    const onInput = (e) => {
        onChange && onChange(`${code.key}_${e.target.value}`);
    }

    return (<div className={styles.imgCode}>
        <Input {...rest} onChange={onInput} />
        <div className={styles.code} onClick={genImageCode}>
            <img src={code.base64} className={styles.image} />
            <div className={styles.change}>换一张？</div>
        </div>
    </div>);
};


