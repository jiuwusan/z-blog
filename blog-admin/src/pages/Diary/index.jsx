import styles from "./style.less"
import KdTable from "@/components/KdTable"
import { Button, Space, DatePicker, Modal } from 'antd';
import Editor from './Editor';
import { useState } from 'react';
import { diaryApi } from '@/api'
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
        await diaryApi.save(values);
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
                await diaryApi.delById({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    const loadData = async (formData) => {
        console.log("数据加载==", formData);
        formData.createAt && (formData.startTime = formData.createAt[0].format('YYYY-MM-DD'));
        formData.createAt && (formData.endTime = formData.createAt[1].format('YYYY-MM-DD'));
        delete formData.createAt;
        return await diaryApi.pageQuery(formData);
    }

    const columns = [
        {
            title: '日期-时间',
            dataIndex: 'created_at_ftt',
            key: 'created_at_ftt',
            align: 'center',
        },
        {
            title: '概述',
            dataIndex: 'overview',
            key: 'overview',
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
                searchBar={({ FormItem }) => <>
                    <FormItem name='createAt' label="日期">
                        <DatePicker.RangePicker />
                    </FormItem>
                </>}
                toolBar={<Button type="primary" onClick={() => {
                    setEditData(null);
                    setEditVisible(true);
                }}>写日记</Button>}
                columns={columns} loadData={loadData}></KdTable>
        </div>
        <Editor value={editData} visible={editVisible} onSubmit={saveData} onClose={() => setEditVisible(false)}></Editor>
    </div>
}