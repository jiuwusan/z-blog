import styles from "./style.less"
import KdTable from "@/components/KdTable"
import { Button, Space, Tag, Modal, Input } from 'antd';
import { useState } from 'react';
import { messageApi } from '@/api';
import Smage from '@/components/Smage';
import Detail from './Detail';
export default (props) => {
    const [detailVisible, setDetailVisible] = useState(false);
    const [reloadKey, setReloadKey] = useState(null);
    const [detailUid, setDetailUid] = useState();

    /**
     * 查看详情
     * @param {*} rowData 
     */
    const showDetail = (uid) => {
        setDetailUid(uid);
        setDetailVisible(true);
    }

    /**
     * 删除
     * @param {*} uid 
     */
    const delOne = (uid) => {
        Modal.confirm({
            title: "系统提示",
            content: "删除后不可恢复，请谨慎操作，删除？",
            onOk: async () => {
                await messageApi.delById({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    const loadData = async (formData) => {
        return await messageApi.pageQuery(formData);
    }

    const columns = [
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            render: (text, recard) => <div className={styles.nickname}>
                <Smage className={styles.avatar} src={recard.avatar}></Smage>
                <div className={styles.text}>{text}</div>
            </div>
        },
        {
            title: '联系方式',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: '日期-时间',
            dataIndex: 'created_at_ftt',
            key: 'created_at_ftt',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <>
                {text === "88" && <Tag color="cyan">待审核</Tag>}
                {text === "20" && <Tag color="cyan">待回复</Tag>}
                {text === "99" && <Tag color="red">已驳回</Tag>}
                {text === "10" && <Tag color="blue">已回复</Tag>}
            </>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" size="small" ghost onClick={() => showDetail(record.uid)}>查看</Button>
                    <Button type="primary" size="small" danger ghost onClick={() => delOne(record.uid)}>删除</Button>
                </Space>
            ),
        }
    ];

    return <div className={styles.messageBox}>
        <div>
            <KdTable rowKey="uid"
                reloadKey={reloadKey}
                searchBar={({ FormItem }) => <>
                    <FormItem name='nickname' label="昵称">
                        <Input />
                    </FormItem>
                    <FormItem name='contact' label="联系方式">
                        <Input />
                    </FormItem>
                </>}
                columns={columns} loadData={loadData}></KdTable>
        </div>
        <Detail onChange={() => setReloadKey(Date.now())} visible={detailVisible} uid={detailUid} onClose={() => setDetailVisible(false)}></Detail>
    </div>
}