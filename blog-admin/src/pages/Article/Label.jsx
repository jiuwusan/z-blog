import styles from "./style.less";
import { useState } from 'react';
import { Input, Checkbox, Button } from 'antd';
export default (props) => {
    const { ...rest } = props || {};
    const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
    ];
    return <div>
        <Checkbox.Group options={options} {...rest} />
        <div style={{ marginTop: 10 }}>
            <Input style={{ width: 100 }}></Input>
            <Button style={{ marginLeft: 8 }} type="primary" ghost>添加</Button>
        </div>
    </div>
}