import styles from './style.less';
import { Layout } from 'antd';
import useProfile from '@/hooks/useProfile';
const { Footer } = Layout;
export default (props) => {
    const [profile, setProfile] = useProfile();
    return (
        <Footer className={styles.footerBox}>{profile?.footer}</Footer>
    );
};
