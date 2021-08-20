import styles from "./style.less";
import { useState, useEffect } from 'react';
import { Drawer, Button, Form } from 'antd';
import CKEditor from '@/components/CKEditor';

export default (props) => {
    const { visible, data, onClose, onSubmit } = props || {};
    const [fttData, setFttData] = useState({});
    const [editForm] = Form.useForm();

    const formSubmit = async () => {
        let values = await editForm.validateFields();
        onSubmit && onSubmit(values, editForm.resetFields);
    }

    //监听uid的变化
    useEffect(() => {
        setFttData(data);
    }, [data]);

    return <Drawer
        title="留言详情"
        onClose={onClose}
        visible={visible}
        width={1100}
        footer={
            <div className={styles.editFooter}>
                <Button onClick={formSubmit} type="primary" style={{ marginRight: 8 }}>确定</Button>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
            </div>
        }
    >
        <Form size="small" validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
            <Form.Item rules={[{ required: true }]} name='content'>
                <CKEditor></CKEditor>
            </Form.Item>
        </Form>
    </Drawer>
}