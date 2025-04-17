import { Link } from 'react-router'
import Center from '../../../components/Center'
import Dollar from '../../../components/Dollar'
import NumberInput from '../../../components/Input/Number'
import Spinner from '../../../components/Spinner/Spinner'
import useCategory from '../../../hooks/useCategory.mjs'
import useProduct from '../../../hooks/useProduct.mjs'
import styles from './CartProduct.module.scss'

export default function CartProduct({ id, count, setCount }) {
    const path = `/products/${id}`
    const product = useProduct(id)
    const categoryName = useCategory(product?.category)

    if (!product) return <Center className={styles.cartproduct}>
        <Spinner />
    </Center>


    return <div className={styles.cartproduct}>
        <Link to={path} className={styles.imagecontainer}>
            <img className={styles.image} src={product.image} />
        </Link>
        <div className={styles.main}>
            <div className={styles.namecategory}>
                <Link to={path} className={styles.name}>{product.name}</Link>
                <p className={styles.category}>{categoryName === null ? product.category : categoryName === false ? 'Null?' : categoryName}</p>
            </div>
            <div className={styles.price}>
                <Dollar >{product.price.toFixed(2)}</Dollar>
            </div>
            <NumberInput className={styles.count}
                value={count}
                onChange={value => setCount(id, value)}
                min={0}
                step={1}
                increment={1}
            />
        </div>
        <div className={styles.side}>
            <Dollar className={styles.subtotal}>{(product.price * count).toFixed(2)}</Dollar>
        </div>
    </div>
}
