import styles from './style.less';
import { Input, Modal, Form, Menu, notification } from 'antd';
import { useState } from 'react';
import { authApi } from '@/api';
import ImgCode from '@/components/ImgCode';
import useAuth from '@/hooks/useAuth';
import { LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
export default (props) => {
    const { onCancel, onOk, ...rest } = props || {};
    const { password } = useAuth();
    const [visible, setVisible] = useState(false);
    const [modalForm] = Form.useForm();

    const submitForm = async () => {
        let values = await modalForm.validateFields();
        await password(values, () => {
            notification.success({
                message: "系统提示",
                description: "修改成功，请重新登录"
            });
        });
        // setVisible(false);
    }

    return (<>
        <Menu.Item key="1" onClick={() => setVisible(true)}>修改密码</Menu.Item>
        <Modal width={320} visible={visible} title="修改密码" onOk={submitForm} onCancel={() => setVisible(false)}>
            <Form size="small" form={modalForm} layout="horizontal">
                <Form.Item rules={[{ required: true }]} name='oldPassword'>
                    <Input prefix={<LockOutlined className={styles.loginIcon} />} type="password" placeholder="请输入原密码" size="middle" />
                </Form.Item>
                <Form.Item rules={[{ required: true }]} name='newPassword'>
                    <Input prefix={<LockOutlined className={styles.loginIcon} />} type="password" placeholder="请输入新密码" size="middle" />
                </Form.Item>
                <Form.Item rules={[{ required: true }]} name='rePassword'>
                    <Input prefix={<LockOutlined className={styles.loginIcon} />} type="password" placeholder="请再次确认新密码" size="middle" />
                </Form.Item>
                <Form.Item prefix={<SafetyCertificateOutlined className={styles.loginIcon} />} placeholder="请输入图形验证码" rules={[{ required: true }]} type="password" name='imageCode'>
                    <ImgCode />
                </Form.Item>
            </Form>
        </Modal>
    </>
    );
};


