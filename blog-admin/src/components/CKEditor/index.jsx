import styles from './style.less';
import { useRef, useEffect } from 'react';
export default (props) => {
    const { value = "", className, onChange, ...rest } = props || {};
    const ckeditorRef = useRef(null);
    const toolbarRef = useRef(null);
    const mounting = useRef(true);
    let DecoupledEditor = window.DecoupledEditor;
    let ckEditor = null;

    const willUnmount = () => {
        console.log("销毁组件");
        //销毁组件
        ckEditor.destroy().catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            if (ckEditor && (ckEditor.getData() !== value)) {
                console.log("##更新CkEditor##");
                ckEditor && ckEditor.setData(value);
            }
        }
    }, [value]);

    useEffect(() => {
        DecoupledEditor
            .create(ckeditorRef.current, { language: "zh-cn" }, {
                // extraPlugins: [MyCustomUploadAdapterPlugin]
            })
            .then(editor => {
                ckEditor = editor;
                //添加工具栏
                toolbarRef.current.appendChild(ckEditor.ui.view.toolbar.element);
                //挂载图片上传钩子
                ckEditor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    return new MyUploadAdapter(loader);
                };
                //监听内容变化
                ckEditor.model.document.on('change:data', (content) => {
                    onChange && onChange(ckEditor.getData());
                });
                //写入默认值
                ckEditor.setData(value);
            })
            .catch(error => {
                console.error(error);
            });
        return willUnmount;
    }, []);

    return <div className={styles.ckcditor + " " + className} {...rest}>
        <div className={styles.toolbar} ref={toolbarRef}></div>
        <div className={styles.ckContentBox}>
            <div className={styles.ckContent} ref={ckeditorRef}></div>
        </div>
    </div>
}

/**
 * 定义图片上传适配器
 */
class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    // 终止上传操作
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // 初始化请求参数
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:9532/upload/ckeitor', true);
        xhr.responseType = 'json';
    }

    // 初始化监听器
    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            //返回图片路径
            console.log("response==", response);
            resolve({
                default: response.data.path[0]
            });
        });
        if (xhr.upload) {
            //监听上传进度
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // 发送请求
    _sendRequest(file) {
        const data = new FormData();
        data.append('upload', file);
        this.xhr.send(data);
    }
}
