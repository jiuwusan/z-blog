import styles from "./style.less";
import { useRef, useState, useEffect } from 'react';
import { Row, Col, Form, Input, List, Button, Modal, notification, Collapse } from 'antd';
const FormItem = Form.Item;
const { Panel } = Collapse;

/**
 * 项目
 * @param {*} props 
 * @returns 
 */
const ProjectItem = (props) => {
    const { onChange, value, onRemove, onSubmit, ...rest } = props || {};
    const [proForm] = Form.useForm();
    const [nameVisible, setNameVisible] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        if (!data.name) {
            setNameVisible(true);
        }
    }, [data.name])

    /**
     * 取消
     */
    const editCancel = () => {
        (!data.name) && onRemove && onRemove();
        setNameVisible(false);
    }

    /**
     * 提交数据
     */
    const formSubmit = async () => {
        let values = await proForm.validateFields();
        onSubmit && onSubmit(values);
        setNameVisible(false);
    }

    return <div>
        <Modal title="请输入项目名称" visible={nameVisible} onCancel={editCancel} onOk={formSubmit}>
            <Form validateMessages={{ required: "${label} 是必填字段" }} form={proForm} layout="vertical">
                <FormItem rules={[{ required: true }]} name='name' label="项目名称">
                    <Input />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='cycle' label="项目周期">
                    <Input />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='dut' label="项目职责">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='tech' label="核心技术">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='diff' label="技术难点">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='scheme' label="解决方案">
                    <Input.TextArea />
                </FormItem>
                <FormItem rules={[{ required: true }]} name='demourl' label="样式地址">
                    <Input.TextArea />
                </FormItem>
            </Form>
        </Modal>
        <ul>
            <li>项目名称:{data.cycle}</li>
        </ul>
    </div>
}

/**
 * 公司
 * @param {*} props 
 * @returns 
 */
const CompanyItem = (props) => {
    const { onChange, value = {}, onRemove, ...rest } = props || {};
    const [data, setData] = useState({});
    const [nameVisible, setNameVisible] = useState(false);
    const comNameRef = useRef(null);
    useEffect(() => {
        if (!data.name) {
            setNameVisible(true);
        }
    }, [data.name])

    /**
     * 取消名称输入
     */
    const nameCancel = () => {
        (!data.name) && onRemove && onRemove();
        setNameVisible(false);
    }

    /**
     * 确认公司名称
     */
    const nameOk = () => {
        let name = comNameRef.current.state.value;
        if (!name) {
            notification.error({
                description: "公司名称不能为空"
            });
            return;
        }
        data.name = name;
        setData(data);
        setNameVisible(false);
    }

    /**
     * 添加项目
     */
    const pushPro = () => {
        setData((temp) => {
            (!temp.list) && (temp.list = []);
            temp.list.push({});
            return { ...temp };
        })
    }

    /**
     * 移除项目
     */
    const removePro = (index) => {
        setData((temp) => {
            (!temp.list) && (temp.list = []);
            temp.list.splice(index, 1);
            return { ...temp };
        })
    }

    return <div>
        <Modal title="请输入公司名称" visible={nameVisible} onCancel={nameCancel} onOk={nameOk}>
            <div style={{ marginTop: "10px" }}>
                <Input ref={comNameRef} placeholder="请输入..." />
            </div>
        </Modal>
        <div style={{ padding: "10px 5px", fontSize: "16px", fontWeight: "bold" }}>{data.name}
            <Button size="small" type="primary" ghost onClick={pushPro} style={{ marginLeft: "15px" }}>添加项目</Button>
        </div>
        <Collapse accordion>
            {
                (data?.list || []).map((item, index) => <Panel forceRender header={item.name || "新项目名称"} key={item.name + index}>
                    <ProjectItem onRemove={() => removePro(index)}></ProjectItem>
                </Panel>)
            }
        </Collapse>
    </div>
}

export default (props) => {
    const { onChange, value, ...rest } = props || {};
    const [companyList, setCompanyList] = useState([]);

    /**
     * 添加公司
     */
    const pushCom = () => {
        let tempList = companyList.concat([{ name: null, list: [] }]);
        setCompanyList(tempList);
    }

    /**
     * 移除公司
     */
    const removeCom = (index) => {
        setCompanyList((list) => {
            list.splice(index, 1);
            return [...list];
        });
    }

    return <div>
        <Button size="small" type="primary" onClick={pushCom}>添加公司</Button>
        <div>
            {
                companyList.map((item, index) => <CompanyItem onRemove={() => removeCom(index)} value={item} key={item.name + index} />)
            }
        </div>
    </div>
}
