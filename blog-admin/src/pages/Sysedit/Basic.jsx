import styles from './style.less';
import { useState, useEffect } from 'react';
import { Drawer, Button, Input, Card, Form } from 'antd';
import UploadImage from '@/components/UploadImage';
import Smage from '@/components/Smage';
import { configApi } from '@/api'
const FormItem = Form.Item;
export default (props) => {
    const { uid = "fb57a600-eace-11eb-96b5-e73f4408ddb8", ...rest } = props || {};
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
                loginBg: values.loginBg[0]
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
        <p>{data?.profile?.name || ''}</p>
        <p>{data?.profile?.footer || ''}</p>
        <p>
            {data?.profile?.loginBg && <Smage src={data?.profile?.loginBg}></Smage>}
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
                <FormItem rules={[{ required: true }]} name='name' label="系统名称">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='shortName' label="系统名称-简写">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='footer' label="底部信息">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} required={true} name='loginBg' label="登录背景">
                    <UploadImage maxCount="1" folder="login_image" />
                </FormItem>
            </Form>
        </Drawer>
    </Card>);
};
