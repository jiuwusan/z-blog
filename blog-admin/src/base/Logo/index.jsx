import styles from './style.less';
import useProfile from '@/hooks/useProfile';
export default (props) => {
    const { collapsed } = props || {};
    const [profile, setProfile] = useProfile();
    return (
        <div className={styles.logoBox}>{collapsed ? profile?.shortName : profile?.name}</div>
    );
};
