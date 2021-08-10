import { useState, useEffect, useRef } from 'react';
import { Input, Checkbox, Button, Notification } from 'antd';
export default (props) => {
    const { queryfn, createfn, ...rest } = props || {};
    const [inputVisible, setInputVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const InputRef = useRef(null);

    const queryOpt = async () => {
        let optTemp = await queryfn();
        setOptions(optTemp);
    }

    const confirm = async () => {
        let name = InputRef.current.state.value;
        await createfn({
            name
        });
        Notification.success({
            message: "系统提示",
            description: "添加成功"
        });
        await queryOpt();
        setInputVisible(false);
    }

    useEffect(() => {
        queryOpt();
    }, [])

    return <div>
        <Checkbox.Group options={options} {...rest} />
        {!inputVisible && <Button onClick={() => setInputVisible(true)} style={{ marginLeft: 8 }} type="primary" ghost>添加</Button>}
        {inputVisible && <div style={{ marginTop: 10 }}>
            <Input style={{ width: 100 }} ref={InputRef}></Input>
            <Button style={{ marginLeft: 8 }} type="primary" ghost onClick={confirm}>确认</Button>
        </div>}
    </div>
}