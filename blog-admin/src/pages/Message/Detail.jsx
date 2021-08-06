import styles from "./style.less";
import { useState, useEffect } from 'react';
import { Drawer, Button, Descriptions } from 'antd';

export default (props) => {
    const { visible, data, onClose } = props || {};
    const [fttData, setFttData] = useState({});

    useEffect(() => {
        setFttData(data);
    }, [data]);

    return <Drawer
        title="留言详情"
        onClose={onClose}
        visible={visible}
        width={600}
        footer={
            <div className={styles.editFooter}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>关闭</Button>
            </div>
        }
    >
        <Descriptions>
            <Descriptions.Item label="昵称">{fttData.nickname}</Descriptions.Item>
            <Descriptions.Item label="联系方式">{fttData.contact}</Descriptions.Item>
            <Descriptions.Item label="日期">{fttData.created_at_ftt}</Descriptions.Item>
            <Descriptions.Item label="留言内容">
                <div dangerouslySetInnerHTML={{ __html: fttData.content }}></div>
            </Descriptions.Item>
        </Descriptions>
    </Drawer>
}