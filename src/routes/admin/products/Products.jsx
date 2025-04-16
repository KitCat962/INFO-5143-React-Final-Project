import { useNavigate } from 'react-router'
import Button from '../../../components/Buttons/Button'
import Spacer from '../../../components/Spacer'
import styles from './Products.module.scss'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner/Spinner'
import Center from '../../../components/Center'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../scripts/firebase'
import Search from '../../../components/Input/Search'
import Modal from '../../../components/Modal/Modal'
import Select from '../../../components/Input/Select'

export default function Products({ }) {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchCategory, setSearchCategory] = useState('all')
    const [products, setProducts] = useState(null)
    useEffect(() => {
        const colRef = collection(db, 'products')
        const q = searchCategory === 'all' ?
            query(colRef) :
            query(colRef, where('category', '==', searchCategory))
        return onSnapshot(q, collection => setProducts(collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
    }, [searchCategory])
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        return onSnapshot(doc(db, 'product_data/categories'), doc => setCategories({ all: 'All', ...doc.data() }))
    }, [])
    // So, apperently firebase does not allow searching fields by substring?
    // Very frustrating. Guess I gotta do it clientside
    const filterSearch = productArray => searchTerm.trim().length === 0 ? productArray :
        productArray.filter(product =>
            product.id.includes(searchTerm) ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )

    const [deleteProduct, setDeleteProduct] = useState(null)
    const handleDelete = () => {
        if (!deleteProduct)
            return
        deleteDoc(doc(db, 'products', deleteProduct.id))
        setDeleteProduct(null)
    }
    const renderModal = () => <Modal visible={!!deleteProduct} requestClose={() => setDeleteProduct(null)}>
        <div style={{ padding: '1em', gap: '1em' }}>
            <h2>Are you sure you want to delete {deleteProduct?.name}?</h2>
            <div style={{ flexDirection: 'row', justifyContent: 'end', gap: '0.5em' }}>
                <Button type='negative' onClick={handleDelete}>Delete</Button>
                <Button type='tertiary' onClick={() => setDeleteProduct(null)}>Cancel</Button>
            </div>
        </div>
    </Modal>

    return <>
        {renderModal()}
        <div className={styles.products}>
            <div className={styles.header}>
                <p className={styles.title}>Products</p>
                <Spacer />
                <Button onClick={() => navigate('new')}>
                    New Product
                </Button>
                <Select
                    value={searchCategory}
                    onChange={setSearchCategory}
                    placeholder='Filter Category'
                    options={Object.entries(categories ?? {}).map(([id, label]) => ({ id, label }))}
                />
                <Search value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className={styles.table}>
                <div className={styles.tableheader}>
                    <p>Product ID</p>
                    <p>Name</p>
                    <p>Description</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p>Image</p>
                    <div></div>
                </div>
                {products ? filterSearch(products).map(product => <div key={product.id} className={styles.item}>
                    <p>{product.id}</p>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{categories?.[product.category] ?? product.category}</p>
                    <p>{product.price}</p>
                    <div>
                        <img className={styles.image} src={product.image} />
                    </div>
                    <div>
                        <Button type='secondary' onClick={() => navigate(`edit/${product.id}`)}>Edit</Button>
                        <Button type='negative' onClick={() => setDeleteProduct(product)}>Delete</Button>
                    </div>
                </div>) : <Center><Spinner /></Center>}
            </div>
        </div>
    </>
}
