import { FaShoppingCart } from 'react-icons/fa'
import styles from './CartButton.module.scss'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth.mjs'
import useCart from '../../hooks/useCart.mjs'
import Spinner from '../Spinner/Spinner'

export default function CartButton({ }) {
    const [user] = useAuth()
    const [cart] = useCart(user)
    const navigate = useNavigate()
    const cartCount = () => cart.reduce((sum, { count }) => sum + count, 0)
    return <div className={styles.cart} onClick={() => navigate('/cart')}>
        <div className={styles.iconbox}>
            <div className={styles.icon}><FaShoppingCart /></div>
            {cart && cart.length > 0 &&
                <span className={styles.number}>{cartCount()}</span>
            }
        </div>
        <span className={styles.label}>Cart</span>
    </div >
}
