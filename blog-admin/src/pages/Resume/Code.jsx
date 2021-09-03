import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
const FormItem = Form.Item;
export default (props) => {
    const { visible, value, onClose, onSubmit } = props || {};
    const [editForm] = Form.useForm();
    const mounting = useRef(true);

    useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            value && editForm.setFieldsValue(value || {});
            (!value) && editForm.resetFields();
        }
    }, [value]);

    //提交表单
    const formSubmit = async () => {
        let values = await editForm.validateFields();
        values.uid = value?.uid;
        onSubmit && onSubmit(values, editForm.resetFields);
    }

    return <Modal
        title="生成授权码"
        onClose={onClose}
        visible={visible}
        onOk={formSubmit}
        onCancel={onClose}
    >
        <Form size="small" validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
            <FormItem rules={[{ required: true }]} name='name' label="名称">
                <Input />
            </FormItem>
            <FormItem name='remark' label="备注">
                <Input.TextArea />
            </FormItem>
        </Form>
    </Modal>
}