import styles from './style.less';
import CKEditor from '@/components/CKEditor';
export default (props) => {
    return (<div className={styles.mainBox}>
        <CKEditor></CKEditor>
    </div>);
};
