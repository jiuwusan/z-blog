import styles from "./style.less"
import KdTable from "@/components/KdTable"
import { Button, Space, DatePicker, Modal } from 'antd';
import Editor from './Editor';
import { useState } from 'react';
import { labelApi } from '@/api';
import Smage from '@/components/Smage';
export default (props) => {
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [reloadKey, setReloadKey] = useState(null);
    /**
     * 保存数据
     * @param {*} values 
     * @param {*} reset 
     */
    const saveData = async (values, reset) => {
        await labelApi.save(values);
        reset();
        setEditVisible(false);
        setReloadKey(Date.now());
    }

    const editOne = (rowData) => {
        setEditData(rowData);
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
                await labelApi.delById({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    const loadData = async (formData) => {
        return await labelApi.pageQuery(formData);
    }

    const columns = [
        {
            title: '图标',
            dataIndex: 'cover',
            key: 'cover',
            align: 'center',
            render: (text) => <Smage className={styles.cover} src={text}></Smage>
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" size="small" ghost onClick={() => editOne(record)}>编辑</Button>
                    <Button type="primary" size="small" danger ghost onClick={() => delOne(record.uid)}>删除</Button>
                </Space>
            ),
        }
    ];

    return <div className={styles.articleBox}>
        <div>
            <KdTable rowKey="uid"
                reloadKey={reloadKey}
                toolBar={<Button type="primary" onClick={() => {
                    setEditData(null);
                    setEditVisible(true);
                }}>添加</Button>}
                columns={columns} loadData={loadData}></KdTable>
        </div>
        <Editor value={editData} visible={editVisible} onSubmit={saveData} onClose={() => setEditVisible(false)}></Editor>
    </div>
}