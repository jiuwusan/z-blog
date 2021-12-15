import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Drawer, Button, Form, Input, Row, Col, Descriptions, Radio, DatePicker } from 'antd';
import UploadImage from '@/components/UploadImage';
import Work from './Work';

//自定义
const FormItem = (props) => {
    const { ...rest } = props || {};
    return <Form.Item style={{ margin: "0px", padding: "0px", border: "0px" }} {...rest}>{props.children}</Form.Item>
};

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
        title="编辑简历"
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
        <Form validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
            <Descriptions column={1} layout="vertical" bordered>
                <Descriptions.Item label="联系方式">
                    <Row>
                        <Col>
                            <FormItem rules={[{ required: true }]} name='mail' label="邮箱">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col offset={1}>
                            <FormItem rules={[{ required: true }]} name='phone' label="手机号码">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col offset={1}>
                            <FormItem rules={[{ required: true }]} name='wechat' label="微信">
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                </Descriptions.Item>

                <Descriptions.Item label="基本信息">
                    <Row wrap={false}>
                        <Col span={18}>
                            <Row wrap={false}>
                                <Col>
                                    <FormItem rules={[{ required: true }]} name='realName' label="姓名">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col offset={1}>
                                    <FormItem rules={[{ required: true }]} name='birth' label="出生年月">
                                        <DatePicker picker="month" />
                                    </FormItem>
                                </Col>
                                <Col offset={1}>
                                    <FormItem rules={[{ required: true }]} name='sex' label="性别">
                                        <Radio.Group>
                                            <Radio.Button value="男">男</Radio.Button>
                                            <Radio.Button value="女">女</Radio.Button>
                                            <Radio.Button value="其他">其他</Radio.Button>
                                        </Radio.Group>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row wrap={false} style={{ marginTop: "10px" }}>
                                <Col>
                                    <FormItem rules={[{ required: true }]} name='edu' label="学历">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col offset={1}>
                                    <FormItem rules={[{ required: true }]} name='academy' label="毕业院校">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col offset={1}>
                                    <FormItem rules={[{ required: true }]} name='workYear' label="工作年限">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>

                        <Col offset={1} span={4}>
                            <FormItem rules={[{ required: true }]} name='avator' label="照片">
                                <UploadImage maxCount="1" folder="resume" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row wrap={false} style={{ marginTop: "10px" }}>
                        <Col>
                            <FormItem rules={[{ required: true }]} name='worker' label="期望职位">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col offset={1}>
                            <FormItem rules={[{ required: true }]} name='salary' label="期望薪资">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col offset={1}>
                            <FormItem rules={[{ required: true }]} name='workCity' label="期望城市">
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                </Descriptions.Item>
                <Descriptions.Item label="工作经历">
                    <FormItem rules={[{ required: true }]} name='works'>
                        <Work />
                    </FormItem>
                </Descriptions.Item>
            </Descriptions>

        </Form>
    </Drawer>
}