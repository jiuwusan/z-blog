import styles from './style.less';
import { useState, useEffect } from 'react';
import { Drawer, Button, Input, Card, Form, Alert } from 'antd';
import LinkItem from '@/components/LinkItem';
import { configApi } from '@/api'
import { cloneData } from '@jws/tools/util';
import UploadImage from '@/components/UploadImage';
const FormItem = Form.Item;

export default (props) => {
    const { uid = "fb57a600-eace-11eb-96b5-e73f4408ddb7", ...rest } = props || {};
    const [editForm] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [termList, setTermList] = useState([]);

    const findById = async () => {
        let result = await configApi.findById({ uid });
        let termListTemp = [];
        result.profile && (result.profile = JSON.parse(result.profile));
        for (let i = 0; i < result.profile.rules.length; i++) {
            result.profile["term_" + i] = result.profile.rules[i];
            termListTemp.push(Date.now() + i);
        }
        setTermList(termListTemp);
        setData(result);
    }

    /**
     * 增加一列
     */
    const addRow = () => {
        let termListTemp = cloneData(termList);
        termListTemp.push(Date.now());
        setTermList(termListTemp);
    }

    /**
     * 移除
     * @param {*} index 
     */
    const remove = (index) => {
        let termListTemp = cloneData(termList);
        termListTemp.splice(index, 1);
        setTermList(termListTemp);
    }

    /**
     * 提交表单
     */
    const formSubmit = async () => {
        let values = await editForm.validateFields();
        //组装数据
        let profile = {
            title: values.title,
            declare: values.declare,
            warning: values.warning,
            left: values.left ? values.left.join(",") : "",
            rules: []
        };

        for (let i = 0; i < termList.length; i++) {
            profile.rules.push(values["term_" + i]);
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
            <Form initialValues={data.profile} className={styles.linkForm} size="middle" validateMessages={{ required: "必填字段" }} form={editForm} layout="vertical">

                <FormItem name='left' label='左侧图片' >
                    <UploadImage maxCount="1" />
                </FormItem>
                <FormItem initialValue={data.signature} rules={[{ required: true }]} name='title' label='标题' >
                    <Input.TextArea />
                </FormItem>
                <div className={styles.termLabel}>
                    <div>规则</div>
                    <Button style={{ marginLeft: 10 }} type="primary" ghost size="small" onClick={addRow}>添加</Button>
                </div>
                <div className={styles.termList}>
                    {termList.map((item, index) => <div key={item} className={styles.termItem}>
                        <FormItem className={styles.termInput} rules={[{ required: true }]} name={`term_${index}`} >
                            <LinkItem folder="image_footer" />
                        </FormItem>
                        <Button ghost danger size="small" className={styles.remove} onClick={() => remove(index)}>移除</Button>
                    </div>)}
                </div>
                <FormItem rules={[{ required: true }]} name='declare' label='交换说明' >
                    <Input.TextArea rows={7} />
                </FormItem>
                <FormItem name='warning' label='温馨提示' >
                    <Input.TextArea />
                </FormItem>
            </Form>
        </Drawer>
    </Card>);
};
