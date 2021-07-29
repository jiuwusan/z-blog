import styles from "./style.less"
import KdTable from "@/components/KdTable"
import { Input, Button, Space } from 'antd';
import Create from './Create';
import { useState } from 'react';
export default () => {
    const [editVisible, setEditVisible] = useState(false);
    //数据源
    const tableData = {
        datalist: [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }]
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" size="small" ghost>编辑</Button>
                    <Button type="primary" size="small" danger ghost>删除</Button>
                </Space>
            ),
        }
    ];

    return <div className={styles.articleBox}>
        <div>
            <KdTable searchBar={({ FormItem }) => <>
                <FormItem name='title' label="标题">
                    <Input placeholder="标题" />
                </FormItem>
            </>}
                toolBar={<Button size="small" type="primary" onClick={() => setEditVisible(true)}>新增</Button>}
                columns={columns} dataSource={tableData}></KdTable>
        </div>
        <Create visible={editVisible} onClose={() => setEditVisible(false)}></Create>
    </div>
}