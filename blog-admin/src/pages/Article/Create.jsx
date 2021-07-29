import styles from "./style.less";
import { useState } from 'react';
import { Drawer, Button, Form } from 'antd';
import CKEditor from '@/components/CKEditor';
import Modal from './Modal';

export default (props) => {
    const { visible, onClose, onSubmit } = props || {};
    const [modalVisible, setModalVisible] = useState(false);
    //提交表单
    const formSubmit = () => {
        setModalVisible(true);
    }

    return <Drawer
        title="创作"
        onClose={onClose}
        visible={visible}
        width="1200px"
        footer={
            <div className={styles.editFooter}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                <Button onClick={formSubmit} type="primary">保存</Button>
            </div>
        }
    >
        <div className={styles.editBody}>
            <CKEditor className={styles.CKEditor}></CKEditor>
        </div>
        <Modal visible={modalVisible} onCancel={() => setModalVisible(false)}></Modal>
    </Drawer>
}