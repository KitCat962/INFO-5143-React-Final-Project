import { Link } from 'react-router'
import Dollar from '../../../components/Dollar'
import Spacer from '../../../components/Spacer'
import styles from './ProductTile.module.scss'

export default function ProductTile({ id, name, price, image, onClick }) {
    const path = `/products/${id}`
    return <div className={styles.productTile}>
        <Link to={path} className={styles.imagecontainer}>
            <img className={styles.image} src={image} />
        </Link>
        <Spacer />
        <Link to={path} className={styles.name}>{name}</Link>
        <Link to={path}><Dollar className={styles.price}>{price.toFixed(2)}</Dollar></Link>
    </div>
}
