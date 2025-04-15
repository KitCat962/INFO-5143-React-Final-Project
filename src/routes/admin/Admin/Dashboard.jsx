import styles from './Dashboard.module.scss'
import Button from "../../../components/Buttons/Button";
import { signOut } from 'firebase/auth';
import { auth } from '../../../scripts/firebase';
import { useNavigate } from 'react-router';
import Spinner from '../../../components/Spinner/Spinner';

export default function Dashboard({ }) {
    const navigate = useNavigate()
    const handleLogout = () => signOut(auth)
    return <div className={styles.dashboard}>
        <div className={styles.divider}>
            <div className={styles.buttons}>
                <Button onClick={() => navigate('orders')}>Orders?</Button>
                <Spinner />
                <div className={styles.spacer} />
                <Button onClick={handleLogout} className={styles.logout}>Logout</Button>
            </div>
            <div className={styles.producttable}>
                <div className={styles.header}>
                    <p className={styles.title}>Products:</p>
                    <Button>New Product</Button>
                </div>
                <div className={styles.table}>

                </div>
            </div>
        </div>
    </div>
}