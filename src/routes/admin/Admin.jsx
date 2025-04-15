import styles from './Admin.module.scss'
import { Outlet, useNavigate } from 'react-router'
import Login from './Login'
import { useEffect, useState } from 'react'
import { auth } from '../../scripts/firebase'
import { signOut } from 'firebase/auth'
import Button from '../../components/Buttons/Button'
import Spinner from '../../components/Spinner/Spinner'
import Spacer from '../../components/Spacer'
import Center from '../../components/Center'
export default function Admin({ }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [authAttempted, setAuthAttempted] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setAuthAttempted(true)
            setUser(user)
            if (!user) {
                navigate('/admin')
            }
        })
    }, [])
    return authAttempted ?
        user ?
            <div className={styles.admin}>
                <div className={styles.buttons}>
                    <Button onClick={() => navigate('orders')}>Orders?</Button>
                    <Button onClick={() => navigate('products')}>Products?</Button>
                    <Spacer />
                    <Button onClick={() => signOut(auth)} className={styles.logout}>Logout</Button>
                </div>
                <Outlet />
            </div> :
            <Login /> :
        <Center><Spinner /></Center>
}