import styles from './Root.module.scss'
import Center from "../components/Center";
import useProduct from '../hooks/useProduct.mjs';
import Spinner from '../components/Spinner/Spinner';
import { Link } from 'react-router';

export default function Root({ }) {
    return <Center>
        <div className={styles.container}>
            <div className={styles.featured}>
                <h2>Starter Kit</h2>
                <div className={styles.featuredcontainer}>
                    <FeaturedProduct id='lkEQ6ZR474AzcNBzLPxS' />
                    <FeaturedProduct id='Y0DvJ711TRbSBkAEmMi3' />
                    <FeaturedProduct id='SBY8qdFgLtdmlwrDvr44' />
                </div>
            </div>
            <div className={styles.featured}>
                <h2>New in Stock</h2>
                <div className={styles.featuredcontainer}>
                    <FeaturedProduct id='R54sByOXzoQQlFUfb9tA' />
                    <FeaturedProduct id='2QeUTWHxLNU0VatSbIA5' />
                    <FeaturedProduct id='dfK3s8ybpqa2N88lY77s' />
                </div>
            </div>
            <div className={styles.featured}>
                <h2>Best Sellers</h2>
                <div className={styles.featuredcontainer}>
                    <FeaturedProduct id='yhNbtQ14uhYV7JgN5zip' />
                    <FeaturedProduct id='ka4YwHkKKi9HvKnwC3H0' />
                    <FeaturedProduct id='OO6cyBXszdetL2ZUBzK8' />
                    <FeaturedProduct id='x6TDuvyCzUKJq2Mmjoqh' />
                </div>
            </div>
        </div>
    </Center>
}

export function FeaturedProduct({ id }) {
    const product = useProduct(id)
    return <Link className={styles.imagecontainer} to={`/products/${id}`}>
        {product ? <img className={styles.image} src={product.image} /> : <Spinner />}
    </Link>
}
