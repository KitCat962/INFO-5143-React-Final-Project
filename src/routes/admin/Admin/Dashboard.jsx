import styles from './Dashboard.module.scss'
import Button from "../../../components/Buttons/Button";
import { signOut } from 'firebase/auth';
import { auth } from '../../../scripts/firebase';

export default function Dashboard({ }) {
    const handleLogout = () => signOut(auth)
    return <div className = {styles.dashboard}>
        <div className = {styles.dashboarddivider}>
            <div className = {styles.buttongroup}>
                <Button>Orders?</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div className = {styles.producttable}>
                <div className = {styles.producttableheader}>
                    <p>Products:</p>
                    <Button>New Product</Button>
                </div>
                <div className = {styles.producttabletable}>

                </div>
            </div>
        </div>
    </div>
}