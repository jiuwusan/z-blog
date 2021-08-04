import styles from './style.less';
import { Card, Row } from 'antd';
import Home from './Home';
import Footer from './Footer';
import Link from './Link';
export default (props) => {
    return (
        <Row className={styles.syseditBox}>
            <Home className={styles.indexConfig}></Home>
            <Footer className={styles.footerConfig}></Footer>
            <Link className={styles.footerConfig}></Link>
        </Row>
    );
};
