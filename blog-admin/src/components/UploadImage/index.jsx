import styles from './style.less';
import { useRef, useEffect, useState } from 'react';
import Smage from '@/components/Smage';
import {
    EyeOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined
} from '@ant-design/icons'
import { fileApi } from '@/api';

export default (props) => {
    const { value = null, noren, folder = "image", maxCount = 99, onChange, itemClass, preview = true, type = "image", accept, ...rest } = props || {};
    const [valueList, setValueList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const InputRef = useRef(null);
    /**
     * 监听外部value值
     */
    useEffect(() => {
        let valueListTemp = null;
        if (value && value.length > 0) {
            let valueType = Object.prototype.toString.call(value);
            switch (valueType) {
                case "[object String]":
                    valueListTemp = value.split(",");
                    break;
                case "[object Array]":
                    valueListTemp = value;
                    break;
            }
        }
        setValueList(valueListTemp);
    }, [value]);

    /**
     * 向外传递value
     */
    useEffect(() => {
        if (flag) {
            onChange && onChange(valueList?.length > 0 ? valueList : null);
        }
        setFlag(true);
    }, [valueList]);

    /**
     * 选择图片
     */
    const chooseFile = () => {
        (!loading) && InputRef.current.click();
    }

    /**
     * 上传
     * @param {*} formData 
     */
    const uploadRequest = async (formData) => {
        try {
            setLoading(true);
            let rusult = await fileApi.upload(formData);
            let valueListTemp = JSON.parse(JSON.stringify(valueList || []));
            Array.prototype.push.apply(valueListTemp, rusult.path);
            setValueList(valueListTemp);
        } catch (error) {

        }
        setLoading(false);
    }

    /**
     * 文件发生改变
     * @param  {...any} rest 
     */
    const fileChange = (e) => {
        let size = maxCount - (valueList || []).length;
        let files = e.target.files;
        const formData = new FormData();
        let i = 0;
        while (i < files.length && size > i) {
            formData.append('file' + (i + 1), files[i]);
            ++i;
        }
        formData.append('folder', folder);
        formData.append('noren', noren);
        uploadRequest(formData);
    }

    /**
     * 移除
     */
    const onRemove = (index) => {
        let valueListTemp = JSON.parse(JSON.stringify(valueList || []));
        valueListTemp.splice(index, 1);
        setValueList(valueListTemp);
    }

    return (<div className={styles.uploadBox} {...rest}>
        <input onChange={fileChange} ref={InputRef} type="file" multiple className={styles.fileInput} accept="image/gif,image/jpeg,image/jpg,image/png,image/svg,image/svg+xml"></input>
        <div className={styles.imageBox}>
            {(valueList || []).map((item, index) => <div key={item} className={styles.imageItem + " " + itemClass}>
                <Smage src={item} className={styles.image}></Smage>
                <div className={styles.option}>
                    {preview && <EyeOutlined className={styles.btn} />}
                    <DeleteOutlined className={styles.btn} onClick={() => onRemove(index)} />
                </div>
            </div>)}
            {((valueList || []).length < maxCount) && <div onClick={chooseFile} className={styles.imageItem + " " + styles.pointer + " " + itemClass}>{loading ? (<LoadingOutlined className={styles.loading} />) : (props.children ? props.children : (<PlusOutlined className={styles.loading} />))}</div>}
        </div>
    </div>)
}