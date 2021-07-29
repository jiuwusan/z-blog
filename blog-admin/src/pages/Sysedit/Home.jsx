import styles from './style.less';
import { useState } from 'react';
import { Drawer, Button, Input, Card, Form } from 'antd';
import Upload from '@/components/Upload';
import { configApi } from '@/api'
const FormItem = Form.Item;
export default (props) => {
    const { uid = "fb57a600-eace-11eb-96b5-e73f4408ddb5", ...rest } = props || {};
    const [editForm] = Form.useForm();
    const [visible, setVisible] = useState(false);

    /**
     * 提交表单
     */
    const formSubmit = async () => {
        let values = await editForm.validateFields();
        await configApi.profile({
            uid,
            profile: values
        });
        setVisible(false);
    }

    return (<Card title="首页配置" extra={<a href="#" onClick={() => setVisible(true)}>编辑</a>} {...rest}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <Drawer
            width="600"
            title="首页配置"
            placement="right"
            closable={true}
            {...{ visible }}
            onClose={() => setVisible(false)}
            footer={
                <div className={styles.editFooter}>
                    <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={formSubmit} type="primary">保存</Button>
                </div>
            }
        >
            <Form size="small" form={editForm} layout="vertical">
                <FormItem rules={[{ required: true, message: '请填写标题！' }]} name='title' label="标题">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true, message: '请填写描述！' }]} name='motto' label="描述">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true, message: '请上传图片！' }]} required={true} name='cover' label="图片">
                    <Upload maxCount="1" folder="image_index" />
                </FormItem>
            </Form>
        </Drawer>
    </Card>);
};
