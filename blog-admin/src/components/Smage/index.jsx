import styles from './style.less';
import { useState, useEffect } from 'react';
import { filePrefix } from '@config';
export default (props) => {

    //排除value，不需要通过外部传入value
    const { src, prefix, ...rest } = props || {};
    const [finalSrc, setFinalSrc] = useState("");

    useEffect(() => {
        setFinalSrc((prefix || filePrefix) + src);
    }, [src]);

    return (<img src={finalSrc} className={styles.smage} {...rest}></img>);
};


