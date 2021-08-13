import styles from './style.less';
import { useState, useEffect } from 'react';
import { filePrefix } from '@config';
export default (props) => {

    //排除value，不需要通过外部传入value
    const { src, prefix, cover, className, ...rest } = props || {};
    const [finalSrc, setFinalSrc] = useState("");

    useEffect(() => {
        setFinalSrc((prefix || filePrefix) + src);
    }, [src]);
    console.log("Smage=cover=", finalSrc)
    return (<>
        {(!cover) && <img src={finalSrc} className={styles.smage + " " + className} {...rest}></img>}
        {cover && <div className={styles.smageCover + " " + className} style={{ backgroundImage: `url(${finalSrc})` }}></div>}
    </>);
};


