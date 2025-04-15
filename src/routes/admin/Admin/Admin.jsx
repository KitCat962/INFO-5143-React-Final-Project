import styles from './Admin.module.scss'
import { useOutletContext } from 'react-router'
import Dashboard from './Dashboard'
import Login from './Login'
export default function Admin({ }) {
    const { user, authAttempted } = useOutletContext()
    console.log(user, authAttempted)
    return user ? <Dashboard/> : <Login/>
}