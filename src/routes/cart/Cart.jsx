import { Link } from 'react-router'
import Button from '../../components/Buttons/Button'
import Dollar from '../../components/Dollar'
import Spinner from '../../components/Spinner/Spinner'
import useCart from '../../hooks/UseCart.mjs'
import useProducts from '../../hooks/useProducts.mjs'
import styles from './Cart.module.scss'
import CartProduct from './CartProduct/CartProduct'

export default function Cart({ }) {
    const [cart, setProduct] = useCart()
    const [products, productMap] = useProducts()

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
                {cart.map(cartproduct => <CartProduct
                    key={cartproduct.id}
                    id={cartproduct.id}
                    count={cartproduct.count}
                    setCount={setProduct}
                />)}
            </div>
            <div className={styles.side}>
                <div className={styles.subtotal}>
                    <span className={styles.label}>Subtotal: </span>
                    {products ? <Dollar className={styles.price}>{calculateSubtotal().toFixed(2)}</Dollar> : <Spinner />}
                </div>
                {cart.length ?
                    <Link to='checkout'><Button>Checkout</Button></Link> :
                    <Button disabled={true}>Checkout</Button>
                }

            </div>
        </div>
    </div>
}
