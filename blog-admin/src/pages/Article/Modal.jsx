import styles from "./style.less";
import { useState } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import Classify from './Classify';
import Label from './Label';

const typeOptions = [
    { label: '原创', value: '10' },
    { label: '转载', value: '20' }
];

export default (props) => {
    const { visible, handleOk, onCancel } = props || {};
    const [searchForm] = Form.useForm();
    const submitForm = () => {
        searchForm.validateFields()
            .then(values => {
                console.log("onSubmit==", values);
                onSubmit && onSubmit(JSON.parse(JSON.stringify(values || {})));
            })
    }
    return <Modal title="归档" visible={visible} onOk={handleOk} onCancel={onCancel}>
        <Form size="small" form={searchForm} layout="horizontal">
            <Form.Item name='title' label="标题">
                <Input size="middle" placeholder="标题" />
            </Form.Item>
            <Form.Item name='classify' label="分类">
                <Classify></Classify>
            </Form.Item>
            <Form.Item name='classify' label="标签">
                <Label></Label>
            </Form.Item>
            <Form.Item name='type' label="类型">
                <Radio.Group
                    options={typeOptions}
                    optionType="button"
                    buttonStyle="solid"
                />
            </Form.Item>
        </Form>
    </Modal>
}