import styles from './Product.module.scss'
import { useNavigate, useParams } from "react-router"
import useProduct from "../../hooks/useProduct.mjs"
import Center from '../../components/Center'
import Spinner from '../../components/Spinner/Spinner'
import Button from '../../components/Buttons/Button'
import useCategories from '../../hooks/useCategories.mjs'
import Dollar from '../../components/Dollar'
import NumberInput from '../../components/Input/Number'
import { useState } from 'react'
import useCart from '../../hooks/UseCart.mjs'
import Spacer from '../../components/Spacer'

export default function Product({ }) {
    const navigate = useNavigate()
    const [cart, setProduct] = useCart()
    const { productID } = useParams()
    const product = useProduct(productID)
    const categories = useCategories()
    const [count, setCount] = useState(1)
    const addToCart = () => {
        setProduct(productID, count, true)
        setCount(1)
    }
    if (product === null) return <Center><Spinner /></Center>
    if (product === false) return <Center><div className={styles.noproduct}>
        No Product exists with ID {productID}
        <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div></Center>
    return <div className={styles.product}>
        <div className={styles.imagecontainer}>
            <div className={styles.imagecontainer2}>
                <img className={styles.image} src={product.image} />
            </div>
        </div>
        <div className={styles.main}>
            <div>
                <h2 className={styles.name}>{product.name}</h2>
                <span className={styles.category}>{categories?.[product.category] ?? 'Null?'}</span>
            </div>
            <p className={styles.description}>{product.description}</p>
        </div>
        <div className={styles.side}>
            <Dollar className={styles.price}>{product.price.toFixed(2)}</Dollar>
            <NumberInput
                value={count}
                onChange={setCount}
                step={1}
                increment={1}
                min={1}
            />
            <Button onClick={addToCart}>Add To Cart</Button>
        </div>
    </div>
}
