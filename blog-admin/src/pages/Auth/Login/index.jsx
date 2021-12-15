import styles from './style.less';
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import ImgCode from '@/components/ImgCode';
import useAuth from '@/hooks/useAuth';
import useProfile from '@/hooks/useProfile';
import Smage from '@/components/Smage';

export default (props) => {
    const [loginForm] = Form.useForm();
    const [profile, setProfile] = useProfile();
    const { login } = useAuth();
    const [refreshKey, setRefreshKey] = useState();

    const formSubmit = async () => {
        const values = await loginForm.validateFields();
        try {
            await login({ ...values, grant: "password" });
        } catch (error) {
            setRefreshKey(Date.now());
        }
    }

    return (<div className={styles.loginBox}>
        <Smage cover className={styles.bg} src={profile?.loginBg}></Smage>
        <div className={styles.formBox}>
            <div className={styles.title}>欢迎登录 {profile?.name} 管理系统</div>
            <Form className={styles.loginForm} size="large" form={loginForm} >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input allowClear prefix={<UserOutlined className={styles.loginIcon} />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input
                        allowClear
                        prefix={<LockOutlined className={styles.loginIcon} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="imageCode"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                >
                    <ImgCode
                        allowClear
                        prefix={<SafetyCertificateOutlined className={styles.loginIcon} />}
                        renderKey={refreshKey}
                        placeholder="ImageCode"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <a className={styles.forgot}>
                        忘记密码?
                    </a>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" className={styles.submit} onClick={formSubmit}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    </div>);
};
