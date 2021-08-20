import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Drawer, Button, Form, Input } from 'antd';
import UploadImage from '@/components/UploadImage';
import UploadFile from '@/components/UploadFile';
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

    return <Drawer
        title="添加友链"
        onClose={onClose}
        visible={visible}
        width={600}
        footer={
            <div className={styles.editFooter}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                <Button onClick={formSubmit} type="primary">保存</Button>
            </div>
        }
    >
        <Form size="small" validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">

            <FormItem rules={[{ required: true }]} name='link' label="链接">
                <Input.TextArea rows={2} />
            </FormItem>
            <FormItem rules={[{ required: true }]} name='logo' label="LOGO">
                <UploadImage maxCount="1" folder="image_link" />
            </FormItem>
            <FormItem rules={[{ required: true }]} name='name' label="名称">
                <Input.TextArea rows={2} />
            </FormItem>
            <FormItem rules={[{ required: true }]} name='desc' label="描述">
                <Input.TextArea rows={2} />
            </FormItem>
            <FormItem name='remark' label="备注">
                <Input.TextArea rows={2} />
            </FormItem>

        </Form>
    </Drawer>
}