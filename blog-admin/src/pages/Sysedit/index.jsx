import styles from './style.less';
import { Card, Row } from 'antd';
import Home from './Home';
export default (props) => {
    return (
        <Row className={styles.syseditBox}>
            <Home className={styles.indexConfig}></Home>
            <Card title="首页配置" extra={<a href="#">编辑</a>} className={styles.indexConfig}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </Row>
    );
};
