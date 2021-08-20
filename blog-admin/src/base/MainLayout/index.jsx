import styles from './style.less';
import { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import Sider from '../Sider';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';
import zh_CN from 'antd/es/locale/zh_CN';

export default (props) => {
    const [collapsed, setCollapsed] = useState(false);

    /**
     * 修改菜单状态
     */
    const collaptap = () => {
        setCollapsed(!collapsed);
    }

    return (
        <ConfigProvider locale={zh_CN}>
            <Layout className={styles.mainLayout}>
                <Sider {...{ collapsed }}></Sider>
                <Layout>
                    <Header {...{ collapsed, collaptap }}></Header>
                    <Content>{props.children}</Content>
                    <Footer></Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
