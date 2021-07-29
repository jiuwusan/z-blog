import styles from './style.less';
export default (props) => {
    const { collapsed } = props || {};
    return (
        <div className={styles.logoBox}>{collapsed ? 'ZY' : 'ZY-Blog'}</div>
    );
};
