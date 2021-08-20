import styles from './style.less';
import { useRef, useEffect, useState } from 'react';
import { Form, Button, Row, } from 'antd';
import {
    DownOutlined, UpOutlined, SearchOutlined, ReloadOutlined
} from '@ant-design/icons';

import util from '@jws/tools/util';

const FormItem = (props) => {
    const { children, ...rest } = props || {};
    return <Form.Item className={styles.mgb10} {...rest}>{children}</Form.Item>
}

export default (props) => {
    const { value, onSubmit } = props || {};
    const [visible, setVisible] = useState(true);
    const [searchForm] = Form.useForm();
    const submitForm = () => {
        searchForm.validateFields()
            .then(values => {
                let fttValues = {};
                for (const key in values) {
                    if (!util.isEmpty(values[key])) {
                        fttValues[key] = values[key];
                    }
                }
                onSubmit && onSubmit(fttValues);
            })
    }


    return (<>
        {props.source && <Row className={visible ? '' : styles.hidden}>
            <Form form={searchForm} layout="inline">
                <a className={styles.visible} onClick={() => setVisible(!visible)}>
                    {visible ? <UpOutlined /> : <DownOutlined />} {visible ? "收起" : "展开"}
                </a>
                <props.source Form={Form} FormItem={FormItem}></props.source>
                <Button icon={<SearchOutlined />} type="primary" onClick={submitForm}>搜索</Button>
                <Button icon={<ReloadOutlined />} style={{ marginLeft: "8px" }} onClick={() => searchForm.resetFields()}>重置</Button>
            </Form>
        </Row>}
    </>)
}