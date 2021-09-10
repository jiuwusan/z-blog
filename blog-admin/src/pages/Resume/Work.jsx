import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
const FormItem = Form.Item;

/**
 * 项目
 * @param {*} props 
 * @returns 
 */
const ProjectItem = (props) => {
    const { onChange, ...rest } = props || {};
    const [itemForm] = Form.useForm();
    return <Form validateMessages={{ required: "${label} 是必填字段" }} form={itemForm} layout="vertical">
        <FormItem rules={[{ required: true }]} name='company' label="项目名称">
            <Input />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='cycle' label="项目周期">
            <Input />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='dut' label="项目职责">
            <Input.TextArea />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='tech' label="核心技术">
            <Input.TextArea />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='diff' label="技术难点">
            <Input.TextArea />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='scheme' label="解决方案">
            <Input.TextArea />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='demourl' label="样式地址">
            <Input.TextArea />
        </FormItem>
    </Form>
}

/**
 * 公司
 * @param {*} props 
 * @returns 
 */
const CompanyItem = (props) => {
    const { onChange, ...rest } = props || {};
    const [comForm] = Form.useForm();
    return <Form validateMessages={{ required: "${label} 是必填字段" }} form={comForm} layout="vertical">
        <FormItem rules={[{ required: true }]} name='company' label="公司名称">
            <Input />
        </FormItem>
        <FormItem rules={[{ required: true }]} name='company' label="公司名称">
            <ProjectItem />
        </FormItem>
    </Form>
}

export default (props) => {
    const { onChange, value, ...rest } = props || {};
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

    return <div>
        <Form validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
            <FormItem rules={[{ required: true }]} name='companys'>
                <ProjectItem />
            </FormItem>
        </Form>
    </div>
}