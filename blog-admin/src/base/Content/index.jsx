import styles from './style.less';
import { Layout } from 'antd';
const { Content } = Layout;
export default (props) => {
    return (
        <Content className={styles.contentBox}>
            <div className={styles.content}>
                {props.children}
            </div>
        </Content>
    );
};
