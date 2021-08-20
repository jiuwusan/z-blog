import styles from './style.less';
import { Layout, Menu } from 'antd';
import Logo from '../Logo';
import useMenu from '@/hooks/useMenu';
import { history } from 'umi';

import {
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

/**
 * 遍历菜单
 * @param {*} props 
 */
const MenuDeep = (data) => {
    if (data && data.length > 0) {
        return data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (<Menu.SubMenu icon={item.icon} key={item.route} title={item.name}>
                    {MenuDeep(item.children)}
                </Menu.SubMenu>)
            } else {
                return (<Menu.Item icon={item.icon} key={item.route}>{item.name}</Menu.Item>)
            }
        })
    }
}

export default (props) => {
    const { collapsed } = props || {};
    const [menus, activeKeys] = useMenu();
    const itemChange = (item) => {
        history.push(item.key);
    }

    const subChange = (item) => {
        console.log("subChange", item);
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <Logo {...{ collapsed }}></Logo>
            <Menu onClick={itemChange} onOpenChange={subChange} theme="dark" mode="inline">
                {MenuDeep(menus)}
            </Menu>
        </Sider>
    );
};
