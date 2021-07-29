import styles from './style.less';
import { Layout } from 'antd';
const { Footer } = Layout;
export default (props) => {
    return (
        <Footer className={styles.footerBox}>ZY-BLOG ©2021 Created by 九五三</Footer>
    );
};
