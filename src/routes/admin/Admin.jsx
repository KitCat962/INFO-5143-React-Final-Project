import styles from './Admin.module.scss'
import { useNavigate } from 'react-router'
import Button from '../../components/Buttons/Button'
import Spinner from '../../components/Spinner/Spinner'
import Center from '../../components/Center'
import useAuth from '../../hooks/useAuth.mjs'
import { useEffect } from 'react'
export default function Admin({ }) {
    const navigate = useNavigate()
    const [user, admin] = useAuth()
    useEffect(() => {
        // If admin has been checked and is not admin
        if (user === false || admin === false)
            navigate('/')
    }, [user, admin])

    // Page load, waiting for firebase auth to start
    if (!user || !admin)
        return <Center><Spinner /></Center>

    return <div className={styles.admin}>
        <div className={styles.buttons}>
            <Button onClick={() => navigate('orders')}>Orders</Button>
            <Button onClick={() => navigate('products')}>Products</Button>
        </div>
        <Outlet />
    </div>

}
