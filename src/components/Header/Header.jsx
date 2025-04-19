import styles from './Header.module.scss'
import logo from '../../assets/logo.webp'
import Spacer from '../Spacer'
import Search from '../Input/Search'
import CartButton from '../CartButton/CartButton'
import { useNavigate } from 'react-router'
import { useState } from 'react'

export default function Header({ }) {
    const navigate = useNavigate()
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
        </div>
    </header>
}
