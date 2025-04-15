import { useNavigate } from 'react-router'
import Button from '../../../components/Buttons/Button'
import Spacer from '../../../components/Spacer'
import styles from './Products.module.scss'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner/Spinner'
import Center from '../../../components/Center'

export default function Products({ }) {
    const navigate = useNavigate()
    const [products, setProducts] = useState(null)
    useEffect(()=>{
        
    }, [])
    return <div className={styles.products}>
        <div className={styles.header}>
            <p className={styles.title}>Products</p>
            <Spacer />
            <Button className={styles.newProduct} onClick={() => navigate('new')}>
                New Product
            </Button>
        </div>
        {
            products ?
                <div className={styles.table}>

                </div> :
                <Center><Spinner /></Center>
        }
    </div>
}