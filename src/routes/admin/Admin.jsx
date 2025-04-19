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
import useAuth from '../../hooks/useAuth.mjs'
export default function Admin({ }) {
    const navigate = useNavigate()
    const [user, admin] = useAuth()

    // Page load, waiting for firebase auth to start
    if (user === null)
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
            <Button onClick={() => signOut(auth)}>Logout</Button>
            <Spacer size={4} />
        </Center>

    return <div className={styles.admin}>
        <div className={styles.buttons}>
            <Button onClick={() => navigate('orders')}>Orders</Button>
            <Button onClick={() => navigate('products')}>Products</Button>
            <Spacer />
            <Button onClick={() => signOut(auth)}>Logout</Button>
        </div>
        <Outlet />
    </div>

}
