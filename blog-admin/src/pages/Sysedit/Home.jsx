import styles from './style.less';
import { useState, useEffect } from 'react';
import { Drawer, Button, Input, Card, Form } from 'antd';
import Upload from '@/components/Upload';
import Smage from '@/components/Smage';
import { configApi } from '@/api'
const FormItem = Form.Item;
export default (props) => {
    const { uid = "fb57a600-eace-11eb-96b5-e73f4408ddb5", ...rest } = props || {};
    const [editForm] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});

    const findById = async () => {
        let result = await configApi.findById({ uid });
        result.profile && (result.profile = JSON.parse(result.profile));
        setData(result);
    }

    /**
     * 提交表单
     */
    const formSubmit = async () => {
        let values = await editForm.validateFields();
        await configApi.profile({
            uid,
            profile: {
                ...values,
                cover: values.cover[0]
            }
        });
        setVisible(false);
        findById();
    }

    /**
     * 初始化数据
     */
    useEffect(() => {
        findById();
    }, [])

    return (<Card title={data.name} extra={<a href="#" onClick={() => setVisible(true)}>编辑</a>} {...rest}>
        <p>{data?.profile?.title || ''}</p>
        <p>{data?.profile?.motto || ''}</p>
        <p>
            {data?.profile?.cover && <Smage src={data?.profile?.cover}></Smage>}
        </p>
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
            <Form size="small" initialValues={data.profile} validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
                <FormItem rules={[{ required: true }]} name='title' label="标题">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='motto' label="描述">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} required={true} name='cover' label="图片">
                    <Upload maxCount="1" folder="image_index" />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='button' label="按钮">
                    <Input />
                </FormItem>
            </Form>
        </Drawer>
    </Card>);
};
