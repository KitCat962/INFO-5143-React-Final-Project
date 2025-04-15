import styles from './Admin.module.scss'
import { Outlet, useNavigate } from 'react-router'
import Login from './Login'
import { useEffect, useState } from 'react'
import { auth, db } from '../../scripts/firebase'
import { signOut } from 'firebase/auth'
import Button from '../../components/Buttons/Button'
import Spinner from '../../components/Spinner/Spinner'
import Spacer from '../../components/Spacer'
import Center from '../../components/Center'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
export default function Admin({ }) {
    const navigate = useNavigate()
    const [attemptedAuth, setAttemptedAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setAttemptedAuth(true)
            setUser(user)
            if (!user)
                navigate('/admin')
        })
    }, [])
    useEffect(() => {
        if (!user) {
            setAdmin(null)
            return
        }
        return onSnapshot(doc(db, 'users', user.uid), doc => setAdmin(doc.get('admin') ?? false))
    }, [user])

    // Page load, waiting for firebase auth to start
    if (!attemptedAuth)
        return <Center><Spinner /></Center>
    // Nobody logged in currently. Show Login
    if (!user)
        return <Login />
    // Somebody is logged in. Waiting to fetch admin data
    if (admin == null)
        return <Center><Spinner /></Center>
    // Admin data fetched. This user is not an admin
    if (!admin)
        return <Center>
            <Spacer size={4} />
            <h2>Unauthorized</h2>
            <Spacer />
            <Button onClick={() => signOut(auth)} className={styles.logout}>Logout</Button>
            <Spacer size={4} />
        </Center>

    return <div className={styles.admin}>
        <div className={styles.buttons}>
            <Button onClick={() => navigate('orders')}>Orders?</Button>
            <Button onClick={() => navigate('products')}>Products?</Button>
            <Spacer />
            <Button onClick={() => signOut(auth)} className={styles.logout}>Logout</Button>
        </div>
        <Outlet />
    </div>

}