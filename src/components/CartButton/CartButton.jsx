import { FaShoppingCart } from 'react-icons/fa'
import styles from './CartButton.module.scss'
import { useNavigate } from 'react-router'

export default function CartButton({ useCart }) {
    const [cart, setProduct] = useCart
    const navigate = useNavigate()
    return <div className={styles.cart} onClick={() => navigate('/cart')}>
        <div className={styles.iconbox}>
            <div className={styles.icon}><FaShoppingCart /></div>
            {cart.length > 0 && <span className={styles.number}>
                {cart.length}
            </span>}
        </div>
        <span className={styles.label}>Cart</span>
    </div >
}
