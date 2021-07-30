import styles from './style.less';
import { useState, useEffect } from 'react';
import { Input } from 'antd';
import Upload from '@/components/Upload';
import { debounce } from '@jws/tools/util';
export default (props) => {
    const { value = null, onChange, folder } = props || {};
    const [icon, setIcon] = useState(null);
    const [text, setText] = useState(null);
    const onUpload = (val) => {
        if (val && val?.length > 0) {
            setIcon(val[0]);
        } else {
            setIcon(null);
        }
    }

    const onInput = debounce(function (e) {
        setText(e.target.value);
    })

    useEffect(() => {
        setIcon(value?.icon || null);
        setText(value?.text || null);
    }, [value]);

    useEffect(() => {
        if (icon && text) {
            onChange && onChange({ icon, text });
        }
    }, [icon, text]);

    return <div className={styles.linkItem}>
        <Upload value={value?.icon || ''} onChange={onUpload} preview={false} itemClass={styles.linkicon} maxCount="1" folder={folder} />
        <Input defaultValue={value?.text || ''} onChange={onInput} placeholder="请上传图标、输入内容" className={styles.linkInput} size="middle" />
    </div>
}