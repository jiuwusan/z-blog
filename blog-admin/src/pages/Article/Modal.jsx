import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { classifyApi, labelApi } from '@/api';
import LabelGroup from './LabelGroup';
import UploadImage from '@/components/UploadImage';
import UploadFile from '@/components/UploadFile';

const typeOptions = [
    { label: '原创', value: '10' },
    { label: '转载', value: '20' }
];

export default (props) => {
    const { visible, value, onSubmit, onCancel } = props || {};
    const [modalForm] = Form.useForm();
    const mounting = useRef(true);
    const submitForm = async () => {
        let values = await modalForm.validateFields()
        onSubmit && onSubmit(values, modalForm.resetFields);
    }


    //监听uid的变化
    useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            value && modalForm.setFieldsValue(value || {});
            (!value) && modalForm.resetFields();
        }
    }, [value, visible]);

    return <Modal maskClosable={false} visible={visible} title="归档" onOk={submitForm} onCancel={onCancel}>
        <Form size="small" form={modalForm} layout="horizontal">
            <Form.Item rules={[{ required: true }]} name='title' label="标题">
                <Input.TextArea size="middle" placeholder="标题" />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='classify' label="分类">
                <LabelGroup queryfn={classifyApi.query} createfn={classifyApi.save}></LabelGroup>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='label' label="标签">
                <LabelGroup queryfn={labelApi.query} createfn={labelApi.save}></LabelGroup>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='type' label="类型">
                <Radio.Group
                    options={typeOptions}
                    optionType="button"
                    buttonStyle="solid"
                />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='cover' label="封面">
                <UploadImage itemClass={styles.acover} maxCount={1} folder="article_image" />
            </Form.Item>
            <Form.Item name='adjunct' label="附件">
                <UploadFile noren="1" folder="article_file" />
            </Form.Item>
        </Form>
    </Modal>
}