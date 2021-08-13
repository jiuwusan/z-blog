import styles from './style.less';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useAuth from '@/hooks/useAuth';
import ExPassword from '@/components/ExPassword';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
} from '@ant-design/icons';

const { Header } = Layout;
export default (props) => {
    const { collapsed, collaptap } = props || {};
    const { logout } = useAuth();
    return (
        <Header className={styles.headerBox}>
            <div className={styles.menuBtn} onClick={() => collaptap()}>
                {collapsed && <MenuUnfoldOutlined></MenuUnfoldOutlined>}
                {!collapsed && <MenuFoldOutlined></MenuFoldOutlined>}
            </div>
            <div style={{ cursor: "pointer" }}>
                <Dropdown overlay={<Menu>
                    <ExPassword></ExPassword>
                    <Menu.Item key="2" danger onClick={logout}>退出登录</Menu.Item>
                </Menu>}>
                    <div>
                        <Avatar icon={<UserOutlined />} />
                        <DownOutlined style={{ marginLeft: "5px" }} />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};
