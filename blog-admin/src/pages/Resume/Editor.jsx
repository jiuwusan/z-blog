import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Drawer, Button, Form, Input, Descriptions as DP } from 'antd';
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
        width={900}
        footer={
            <div className={styles.editFooter}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                <Button onClick={formSubmit} type="primary">保存</Button>
            </div>
        }
    >
        <Form size="small" validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">

            <DP>
                <DP.Item>
                    <FormItem rules={[{ required: true }]} name='link'>
                        <Input />
                    </FormItem>
                </DP.Item>
                <DP.Item>
                    <FormItem rules={[{ required: true }]} name='logo'>
                        <UploadImage maxCount="1" folder="resume" />
                    </FormItem>
                </DP.Item>
            </DP>

        </Form>
    </Drawer>
}