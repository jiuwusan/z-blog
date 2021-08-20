import styles from "./style.less";
import { useState, useEffect } from 'react';
import { Drawer, Button, Descriptions, Modal } from 'antd';
import { messageApi } from '@/api';
import Reply from './Reply';
import Smage from '@/components/Smage';

export default (props) => {
    const { visible, uid = "", onClose, onChange, onAudit, onReject } = props || {};
    const [fttData, setFttData] = useState({});
    const [editorVisible, setEditorVisible] = useState(false);

    /**
     * 审核通过
     * @param {*} uid 
     */
    const audit = () => {
        Modal.confirm({
            title: "系统提示",
            content: "请确保内容符合规范？",
            onOk: async () => {
                await messageApi.audit({ uid });
                findById(true);
            }
        })
    }

    /**
     * 驳回
     */
    const reject = () => {
        Modal.confirm({
            title: "系统提示",
            content: "驳回后后不可撤销，请谨慎操作，确定？",
            onOk: async () => {
                await messageApi.reject({ uid });
                findById(true);
            }
        })
    }

    /**
     * 回复
     */
    const reply = async (values, reset) => {
        await messageApi.reply({ ...values, uid });
        reset();
        findById(true);
        setEditorVisible(false);
    }

    /**
     * 详情
     * @param {*} uid 
     */
    const findById = async (refresh) => {
        let result = await messageApi.findById({ uid });
        setFttData(result);
        if (refresh) {
            onChange && onChange(result);
        }
    }

    //监听uid的变化
    useEffect(() => {
        if (uid) {
            findById();
        } else {
            setFttData({});
            onClose && onClose();
        }
    }, [uid]);

    return <Drawer
        title="留言详情"
        onClose={onClose}
        visible={visible}
        width={600}
        footer={
            <div className={styles.editFooter}>
                {fttData.status === "88" && <Button onClick={audit} type="primary" style={{ marginRight: 8 }}>通过</Button>}
                {fttData.status === "88" && <Button onClick={reject} danger ghost style={{ marginRight: 8 }}>驳回</Button>}
                {fttData.status * 1 < 88 && <Button onClick={() => setEditorVisible(true)} type="primary" style={{ marginRight: 8 }}>回复</Button>}
                <Button onClick={onClose} style={{ marginRight: 8 }}>关闭</Button>
            </div>
        }
    >
        <Descriptions column={1} bordered>
            <Descriptions.Item label="昵称">
                <div className={styles.nickname}>
                    <Smage className={styles.avatar} src={fttData.avatar}></Smage>
                    <div className={styles.text}>{fttData.nickname}</div>
                </div>
            </Descriptions.Item>
            <Descriptions.Item label="联系方式">{fttData.contact}</Descriptions.Item>
            <Descriptions.Item label="日期">{fttData.created_at_ftt}</Descriptions.Item>
            <Descriptions.Item label="留言内容">
                <div dangerouslySetInnerHTML={{ __html: fttData.content || "" }}></div>
            </Descriptions.Item>
            {fttData?.replys?.length > 0 && <Descriptions.Item label="回复内容">
                <div dangerouslySetInnerHTML={{ __html: fttData?.replys[0]?.content || "" }}></div>
            </Descriptions.Item>}
        </Descriptions>
        <Reply visible={editorVisible} onSubmit={reply} onClose={() => setEditorVisible(false)}></Reply>
    </Drawer>
}