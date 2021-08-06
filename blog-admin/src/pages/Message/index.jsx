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
    const [detailData, setDetailData] = useState({});

    /**
     * 查看详情
     * @param {*} rowData 
     */
    const showDetail = (rowData) => {
        setDetailData(rowData);
        setDetailVisible(true);
    }

    /**
     * 审核通过
     * @param {*} uid 
     */
    const audit = (uid) => {
        Modal.confirm({
            title: "系统提示",
            content: "请确保内容符合规范？",
            onOk: async () => {
                await messageApi.audit({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    /**
     * 驳回
     * @param {*} uid 
     */
    const reject = (uid) => {
        Modal.confirm({
            title: "系统提示",
            content: "驳回后后不可撤销，请谨慎操作，确定？",
            onOk: async () => {
                await messageApi.reject({ uid });
                setReloadKey(Date.now());
            }
        })
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
                {text === "20" && <Tag color="cyan">待审核</Tag>}
                {text === "30" && <Tag color="red">已驳回</Tag>}
                {text === "10" && <Tag color="blue">通过</Tag>}
            </>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" size="small" ghost onClick={() => showDetail(record)}>查看</Button>
                    {record.status === "20" && <Button type="primary" size="small" ghost onClick={() => audit(record.uid)}>通过</Button>}
                    {record.status === "20" && <Button type="primary" size="small" danger ghost onClick={() => reject(record.uid)}>驳回</Button>}
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
        <Detail visible={detailVisible} data={detailData} onClose={() => setDetailVisible(false)}></Detail>
    </div>
}