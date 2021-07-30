import styles from './style.less';
import { useState, useEffect } from 'react';
import { Drawer, Button, Input, Card, Form, Tabs, Alert } from 'antd';
import LinkItem from '@/components/LinkItem';
import { configApi } from '@/api'
import { cloneData } from '@jws/tools/util';
const { TabPane } = Tabs;
const FormItem = Form.Item;

const LinkTabBox = (props) => {
    const { value, prefix = '' } = props || {};
    const [linkList, setLinkList] = useState([]);

    useEffect(() => {
        setLinkList(value?.content || [])
    }, [value])

    const addRow = () => {
        let linkListTemp = JSON.parse(JSON.stringify(linkList));
        linkListTemp.push({});
        setLinkList(linkListTemp);
    }

    return <div className={styles.LinkTabBox}>
        <FormItem initialValue={value?.title} rules={[{ required: true }]} name={`${prefix}_title`} label="标题" >
            <Input />
        </FormItem>
        <div className={styles.conLabel}>
            内容列表
        </div>
        <div className={styles.linkListBox}>
            <div className={styles.linkList}>
                {linkList.map((item, index) => <div key={index} className={styles.linkListItem}>
                    <FormItem initialValue={item} rules={[{ required: true }]} name={`${prefix}_link_${index}`} >
                        <LinkItem />
                    </FormItem>
                    <div>
                        <Button ghost danger size="small" className={styles.del}>移除</Button>
                    </div>
                </div>)}
            </div>
            <div>
                <Button type="primary" ghost size="small" onClick={addRow}>添加</Button>
            </div>
        </div>
    </div>
}

export default (props) => {
    const { uid = "fb57a600-eace-11eb-96b5-e73f4408ddb6", ...rest } = props || {};
    const [editForm] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [tabList, setTabList] = useState([Date.now() + ""]);

    const findById = async () => {
        let result = await configApi.findById({ uid });
        let tabListTemp = [];
        result.profile && (result.profile = JSON.parse(result.profile));
        //数据还原
        let initData = { signature: result.profile.signature };
        let prefix;
        for (let i = 0; i < result.profile.list.length; i++) {
            prefix = Date.now() + i + "";
            tabListTemp.push(prefix);
            initData[`${prefix}`] = result.profile.list[i];
        }
        setData({
            ...initData,
            name: result.name,
            name: result.remark,
            profile: result.profile
        });
        setTabList(tabListTemp);
    }

    /**
     * 删除
     * @param {*} key 
     */
    const onEdit = (key) => {
        let tabListTemp = cloneData(tabList);
        if (Object.prototype.toString.call(key) === "[object Object]") {
            tabListTemp.push(Date.now() + "");
        } else {
            tabListTemp.splice(tabListTemp.indexOf(key), 1);
        }
        setTabList(tabListTemp);
    }

    /**
     * 提交表单
     */
    const formSubmit = async () => {
        let values = await editForm.validateFields();
        //组装数据
        let profile = { list: [] };
        let index;
        for (let key in values) {
            index = tabList.indexOf(key.split("_")[0]);
            if (tabList.indexOf(key.split("_")[0]) > -1) {
                if (!profile.list[index]) {
                    profile.list[index] = { content: [] }
                }
                if (key.indexOf("title") > -1) {
                    profile.list[index].title = values[key];
                } else {
                    profile.list[index].content.push(values[key]);
                }
            } else {
                profile[key] = values[key];
            }
        }
        await configApi.profile({
            uid,
            profile
        });
        setVisible(false);
        findById();
    }

    /**
     * 初始化数据
     */
    useEffect(() => {
        findById();
    }, [])

    return (<Card title={data.name} extra={<a href="#" onClick={() => setVisible(true)}>编辑</a>} {...rest}>
        <Alert
            message="温馨提示"
            description="点击编辑，查看详情"
            type="info"
            showIcon
        />
        <Drawer
            width="600"
            title={data.name}
            placement="right"
            closable={true}
            {...{ visible }}
            onClose={() => setVisible(false)}
            footer={
                <div className={styles.editFooter}>
                    <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={formSubmit} type="primary">保存</Button>
                </div>
            }
        >
            <Form size="middle" validateMessages={{ required: "必填字段" }} form={editForm} layout="vertical">
                <FormItem initialValue={data.signature} rules={[{ required: true }]} name='signature' label='署名' >
                    <Input.TextArea />
                </FormItem>

                <Tabs onEdit={onEdit} type="editable-card">
                    {tabList.map((item, index) => <TabPane forceRender={true} tab={`第${index + 1}列`} key={item}>
                        <LinkTabBox value={data[item]} prefix={item} />
                    </TabPane>)}
                </Tabs>

            </Form>
        </Drawer>
    </Card>);
};
