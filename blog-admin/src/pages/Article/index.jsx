import styles from "./style.less"
import KdTable from "@/components/KdTable"
import { Input, Button, Space, Tag, Modal } from 'antd';
import Edit from './Edit';
import { useState, useEffect } from 'react';
import { articleApi } from '@/api'
export default () => {
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [reloadKey, setReloadKey] = useState(null);

    // useEffect(() => {
    //     if (!editVisible) {
    //         setEditData(null);
    //     }
    // }, [editVisible])

    const loadData = async (formData) => {
        console.log("数据加载==", formData);
        return await articleApi.pageQuery(formData);
    }

    const saveData = async (values, reset) => {
        await articleApi.save({ ...values, uid: editData?.uid });
        reset();
        setEditVisible(false);
        setReloadKey(Date.now());
    }

    /**
     * 编辑
     * @param {*} rowData 
     */
    const editOne = async (uid) => {
        let result = await articleApi.findById({ uid });
        // setEditData(null);
        setEditData(result);
        setEditVisible(true);
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
                await articleApi.delById({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    /**
     * 发布
     * @param {*} uid 
     */
    const publish = (uid) => {
        Modal.confirm({
            title: "系统提示",
            content: "发布后会对外公开，阅读，确定？",
            onOk: async () => {
                await articleApi.publish({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    /**
     * 撤回
     * @param {*} uid 
     */
    const revocat = (uid) => {
        Modal.confirm({
            title: "系统提示",
            content: "撤回后可能导致用户查阅失败，确定？",
            onOk: async () => {
                await articleApi.revocat({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '日期-时间',
            dataIndex: 'created_at_ftt',
            key: 'created_at_ftt',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <>
                {text === "10" && <Tag color="green">原创</Tag>}
                {text === "20" && <Tag color="cyan">转载</Tag>}
            </>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <>
                {text === "99" && <Tag color="red">未发布</Tag>}
                {text === "10" && <Tag color="blue">已发布</Tag>}
            </>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    {record.status === "99" && <Button type="primary" size="small" ghost onClick={() => publish(record.uid)}>发布</Button>}
                    {record.status === "99" && <Button type="primary" size="small" ghost onClick={() => editOne(record.uid)}>编辑</Button>}
                    {record.status === "10" && <Button type="primary" size="small" ghost onClick={() => revocat(record.uid)}>撤回</Button>}
                    <Button type="primary" size="small" danger ghost onClick={() => delOne(record.uid)}>删除</Button>
                </Space>
            ),
        }
    ];

    return <div className={styles.articleBox}>
        <div>
            <KdTable rowKey="uid"
                reloadKey={reloadKey}
                searchBar={({ FormItem }) => <>
                    <FormItem name='title' label="标题">
                        <Input placeholder="标题" />
                    </FormItem>
                </>}
                toolBar={<Button size="small" type="primary" onClick={() => { setEditVisible(true); setEditData(null); }}>开始创作</Button>}
                columns={columns} loadData={loadData}></KdTable>
        </div>
        <Edit value={editData} visible={editVisible} onSubmit={saveData} onClose={() => setEditVisible(false)}></Edit>
    </div>
}