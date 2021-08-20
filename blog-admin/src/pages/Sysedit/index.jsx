import styles from './style.less';
import { Tabs, Row } from 'antd';
import Home from './Home';
import Footer from './Footer';
import Link from './Link';
import Basic from './Basic';
import General from './General';

const { TabPane } = Tabs;
export default (props) => {
    return (
        <Tabs defaultActiveKey="1" className={styles.tabsBox}>
            <TabPane tab="客户端配置" key="1">
                <Row className={styles.syseditBox}>
                    <General className={styles.configItem}></General>
                    <Footer className={styles.configItem}></Footer>
                    <Home className={styles.configItem}></Home>
                    <Link className={styles.configItem}></Link>
                </Row>
            </TabPane>
            <TabPane tab="管理端配置" key="2">
                <Row className={styles.syseditBox}>
                    <Basic className={styles.configItem}></Basic>
                </Row>
            </TabPane>
        </Tabs>

    );
};
