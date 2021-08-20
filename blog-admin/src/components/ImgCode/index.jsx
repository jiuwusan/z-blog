import styles from './style.less';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { validApi } from '@/api';
export default (props) => {

    //排除value，不需要通过外部传入value
    const { onChange, value, placeholder = "请输入图形验证码", ...rest } = props || {};
    const [code, setCode] = useState("");

    const genImageCode = async () => {
        let result = await validApi.imageCode();
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
        let value = e.target.value ? `${code.key}_${e.target.value}` : null;
        onChange && onChange(value);
    }

    return (<div className={styles.imgCode}>
        <Input {...rest} placeholder={placeholder} onChange={onInput} />
        <div className={styles.code} onClick={genImageCode}>
            <img src={code.base64} className={styles.image} />
            <div className={styles.change}>换一张？</div>
        </div>
    </div>);
};


