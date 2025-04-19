import styles from './Header.module.scss'
import logo from '../../assets/logo.webp'
import Search from '../Input/Search'
import CartButton from '../CartButton/CartButton'
import { Link, useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth.mjs'
import Button from '../Buttons/Button'
import { FaRegUserCircle } from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { auth } from '../../scripts/firebase'

export default function Header({ }) {
    const navigate = useNavigate()
    const { pathname = '/' } = useLocation()
    const [user, admin] = useAuth()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = term => {
        if (term && term.trim().length) {
            navigate(`/search?${new URLSearchParams({ term })}`)
            setSearchTerm('')
        }
    }

    return <header className={styles.header}>
        <div className={styles.start} onClick={() => navigate('/')}>
            <img className={styles.logo} src={logo} />
            <span className={styles.title}>Website Name</span>
        </div>
        {/* <Spacer /> */}
        <div className={styles.end}>
            <Search value={searchTerm} onEnter={handleSearch} onChange={setSearchTerm} />
            <CartButton />
            {user ?
                <div className={styles.usergroup}>
                    <div className={styles.user}>
                        <FaRegUserCircle />
                    </div>
                    <div className={styles.userdropdown}>
                        {admin && <Button onClick={() => navigate('/admin')}>Admin</Button>}
                        <Button onClick={() => signOut(auth)}>Logout</Button>
                    </div>
                </div>
                : <Link to='/login' state={{ prevLocation: pathname }} className={styles.login}>Login</Link>
            }
        </div>
    </header>
}
//signOut(auth).then(() => console.log('signout success')).catch(e => console.log('signout fail', e)).finally(() => console.log('signout end'))
