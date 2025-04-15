import './Dashboard.scss'
import Button from "../../../components/Buttons/Button";
import { signOut } from 'firebase/auth';
import { auth } from '../../../scripts/firebase';

export default function Dashboard({ }) {
    const handleLogout = () => signOut(auth)
    return <div className="dashboard">
        <div className="dashboarddivider" style={{ flexDirection: 'row' }}>
            <div className='buttongroup'>
                <Button>Orders?</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div className='producttable'>
                <div className='producttableheader'>
                    <p>Products:</p>
                    <Button>New Product</Button>
                </div>
                <div className='producttabletable'>

                </div>
            </div>
        </div>
    </div>
}