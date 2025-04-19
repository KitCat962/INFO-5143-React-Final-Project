import { useNavigate } from 'react-router'
import useOrders from '../../../hooks/useOrders.mjs'
import styles from './Orders.module.scss'
import { useState } from 'react'
import useProvinces from '../../../hooks/useProvinces.mjs'
import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Buttons/Button'
import Spacer from '../../../components/Spacer'
import Center from '../../../components/Center'
import Spinner from '../../../components/Spinner/Spinner'
import Search from '../../../components/Input/Search'

export default function Orders({ }) {
    const navigate = useNavigate()
    const [orders, ordersMap] = useOrders()
    const provinces = useProvinces()
    const [searchTerm, setSearchTerm] = useState('')

    const filterSearch = arr => searchTerm.trim().length === 0 ? arr :
        arr.filter(order =>
            order.id.includes(searchTerm) ||
            order.userUID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.billingFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.billingLastName.toLowerCase().includes(searchTerm.toLowerCase())
        )

    const [deleteOrder, setDeleteOrder] = useState(null)
    const handleDelete = () => {
        if (!deleteOrder)
            return
        deleteDoc(doc(db, 'orders', deleteOrder.id))
        setDeleteOrder(null)
    }
    const renderModal = () => <Modal visible={!!deleteOrder} requestClose={() => setDeleteOrder(null)}>
        <div style={{ padding: '1em', gap: '1em' }}>
            <h2>Are you sure you want to delete {deleteOrder?.name}?</h2>
            <div style={{ flexDirection: 'row', justifyContent: 'end', gap: '0.5em' }}>
                <Button type='negative' onClick={handleDelete}>Delete</Button>
                <Button type='tertiary' onClick={() => setDeleteOrder(null)}>Cancel</Button>
            </div>
        </div>
    </Modal>

    return <>
        {renderModal()}
        <div className={styles.orders}>
            <div className={styles.header}>
                <p className={styles.title}>Orders</p>
                <Spacer />
                <Search value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className={styles.table}>
                <div className={styles.tableheader}>
                    <p>Order ID</p>
                    <p>User UID</p>
                    <p>Client Name</p>
                    <p>Client Email</p>
                    <p>Client Phone Number</p>
                    <p>Client Shipping Address</p>
                    <p>Client Billing Address</p>
                    <div></div>
                </div>
                {orders ? filterSearch(orders).map(order => <div key={order.id} className={styles.item}>
                    <p>{order.id}</p>
                    <p>{order.userUID}</p>
                    <p>{order.firstName} {order.lastName}</p>
                    <p>{order.email}</p>
                    <p>{order.phoneNumber}</p>
                    <div className={styles.address}>
                        <p>{order.address.apt} {order.address.apt && '-'} {order.address.street}</p>
                        <p>{order.address.city} {provinces?.[order.address.province] ?? order.address.province} {order.address.postalcode}</p>
                        <p>Canada</p>
                    </div>
                    {order.billingSameAsShipping ? <p>Same As Shipping</p> : <div className={styles.address}>
                        <p>{order.address.apt} {order.address.apt && '-'} {order.address.street}</p>
                        <p>{order.address.city} {provinces?.[order.address.province] ?? order.address.province} {order.address.postalcode}</p>
                        <p>Canada</p>
                    </div>}
                    <div>
                        <Button type='tertiary' onClick={() => navigate(order.id)}>View</Button>
                        <Button type='negative' onClick={() => setDeleteProduct(order)}>Delete</Button>
                    </div>
                </div>) : <Center><Spinner /></Center>}
            </div>
        </div>
    </>
}
