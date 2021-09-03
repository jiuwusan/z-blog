import styles from "./style.less";
import { useState, useEffect, useRef } from 'react';
import { Drawer, Button, Form } from 'antd';
import CKEditor from '@/components/CKEditor'; cloneData
import Modal from './Modal';
import { cloneData } from '@jws/tools/util';

export default (props) => {
    const { visible, value, onClose, onSubmit } = props || {};
    const [fttData, setFttData] = useState({});
    const [editForm] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const mounting = useRef(true);
    const setValueTimer = useRef(null);

    const formSubmit = async () => {
        let values = await editForm.validateFields();
        let dataTemp = cloneData(fttData || {});
        dataTemp.content = values.content;
        setFttData(dataTemp);
        // onSubmit && onSubmit(values, editForm.resetFields);
        setModalVisible(true);
    }

    /**
     * 提交数据
     * @param {*} values 
     * @param {*} reset 
     */
    const modalSubmit = (values, reset) => {
        values.content = fttData.content;
        onSubmit && onSubmit(values, () => {
            reset();
            editForm.resetFields();
            setModalVisible(false);
        })

    }

    //监听uid的变化
    useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            value && editForm.setFieldsValue(value || {});
            (!value) && editForm.resetFields();
        }
    }, [value]);

    return <Drawer
        title="写文章"
        onClose={onClose}
        visible={visible}
        width={1100}
        bodyStyle={{ scrollbarWidth: "0px" }}
        footer={
            <div className={styles.editFooter}>
                <Button onClick={formSubmit} type="primary" style={{ marginRight: 8 }}>确定</Button>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
            </div>
        }
    >
        <Form size="small" validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
            <Form.Item rules={[{ required: true }]} name='content'>
                <CKEditor className={styles.editorBox}></CKEditor>
            </Form.Item>
        </Form>
        <Modal value={value} visible={modalVisible} onSubmit={modalSubmit} onCancel={() => setModalVisible(false)}></Modal>
    </Drawer>
}