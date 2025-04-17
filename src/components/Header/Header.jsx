import styles from './Header.module.scss'
import logo from '../../assets/logo.webp'
import Spacer from '../Spacer'
import Search from '../Input/Search'
import CartButton from '../CartButton/CartButton'
import { useNavigate } from 'react-router'

export default function Header({ useCart }) {
    const navigate = useNavigate()
    return <header className={styles.header}>
        <div className={styles.start} onClick={() => navigate('/')}>
            <img className={styles.logo} src={logo} />
            <span className={styles.title}>Website Name</span>
        </div>
        <Spacer />
        <div className={styles.end}>
            <Search />
            <CartButton useCart={useCart} />
        </div>
    </header>
}
