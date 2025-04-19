import { Link } from 'react-router'
import Button from '../../components/Buttons/Button'
import Dollar from '../../components/Dollar'
import Spinner from '../../components/Spinner/Spinner'
import useCart from '../../hooks/useCart.mjs'
import useProductMap from '../../hooks/useProductMap.mjs'
import styles from './Cart.module.scss'
import CartProduct from './CartProduct/CartProduct'
import useAuth from '../../hooks/useAuth.mjs'
import Center from '../../components/Center'

export default function Cart({ }) {
    const [user] = useAuth()
    const [cart, setProduct] = useCart(user)
    const productMap = useProductMap()

    const calculateSubtotal = () => cart.reduce(
        (prev, cartproduct) => prev + (productMap[cartproduct.id]?.price ?? 0) * cartproduct.count, 0)
    return <div className={styles.cart}>
        <div className={styles.header}>
            <h2 className={styles.title}>
                Cart
            </h2>
        </div>
        <div className={styles.divider}>
            <div className={styles.productlist}>
                {cart ? cart.map(cartproduct => <CartProduct
                    key={cartproduct.id}
                    id={cartproduct.id}
                    count={cartproduct.count}
                    setCount={setProduct}
                />) : cart === null && <Center><Spinner /></Center>}
            </div>
            <div className={styles.side}>
                <div className={styles.subtotal}>
                    <span className={styles.label}>Subtotal: </span>
                    {productMap && cart ?
                        <Dollar className={styles.price}>{calculateSubtotal().toFixed(2)}</Dollar> :
                        cart === null ? <Spinner /> : <Dollar className={styles.price}>0</Dollar>}
                </div>
                {cart && cart.length ?
                    <Link to='checkout'><Button>Checkout</Button></Link> :
                    <Button disabled={true}>Checkout</Button>
                }

            </div>
        </div>
    </div>
}
