import styles from './style.less';
import { useRef, useEffect, useState } from 'react';
import { Button } from 'antd';
import {
    UploadOutlined, LoadingOutlined, PushpinOutlined, DeleteOutlined
} from '@ant-design/icons'
import { fileApi } from '@/api';
import { filePrefix } from '@config';

export default (props) => {
    const { value = null, noren, folder = "file", maxCount = 99, onChange, itemClass, preview = true, accept = "*", ...rest } = props || {};
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
            console.log("file==", files[i]);
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

    const getFileName = (pathname) => {
        let pos = pathname.lastIndexOf('/');
        return pathname.substr(pos + 1);
    }

    const download = (item) => {
        let aLink = document.createElement('a');
        aLink.href = filePrefix + item;//设置下载的图片链接
        aLink.download = getFileName(item);//设置图片下载之后的名称
        aLink.click();//触发点击事件
    }

    return (<div className={styles.uploadBox} {...rest}>
        <input onChange={fileChange} ref={InputRef} type="file" multiple className={styles.fileInput} accept={accept}></input>
        {((valueList || []).length < maxCount) && <Button onClick={chooseFile} icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>选择文件</Button>}
        <div className={styles.imageBox}>
            {(valueList || []).map((item, index) => <div key={item} className={styles.imageItem + " " + itemClass}>
                <div className={styles.nameBox}>
                    <PushpinOutlined className={styles.nameIcon} />
                    <div className={styles.name} onClick={() => download(item)}>{getFileName(item)}</div>
                </div>
                <DeleteOutlined className={styles.delBtn} onClick={() => onRemove(index)} />
            </div>)}
        </div>
    </div>)
}