import { useNavigate, useParams } from "react-router"
import useOrder from "../../../../hooks/useOrder.mjs"
import Center from "../../../../components/Center"
import Spinner from "../../../../components/Spinner/Spinner"
import Button from "../../../../components/Buttons/Button"
import styles from './ViewOrder.module.scss'
import useProvinces from "../../../../hooks/useProvinces.mjs"
import useProducts from "../../../../hooks/useProducts.mjs"
import Dollar from "../../../../components/Dollar"

export default function ViewOrder({ }) {
    const navigate = useNavigate()
    const { orderID } = useParams()
    const order = useOrder(orderID)
    const provinces = useProvinces()
    const [products, productMap] = useProducts()
    const calculateSubtotal = () => order && productMap ? order.products.reduce((sum, { id, count }) => sum + productMap[id].price * count, 0) : 0
    if (order === null) return <Center><Spinner /></Center>
    if (order === false) return <Center><div className={styles.noorder}>
        No Order exists with ID {orderID}
        <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div></Center>
    return <Center>
        <div className={styles.order}>
            <h2>Order ID: {order.id}</h2>
            <div className={styles.sub}>
                <p>User UID: {order.userUID ?? 'No User'}</p>
                <p>User Email: {order.email}</p>
                <p>User Phone Number: {order.phoneNumber ?? 'unspecified'}</p>
            </div>
            <br />
            <h2>Shipping Information:</h2>
            <div className={styles.sub}>
                <p>{order.firstName} {order.lastName}</p>
                <p>{order.address.apt} {order.address.apt && '-'} {order.address.street}</p>
                <p>{order.address.city} {provinces?.[order.address.province] ?? order.address.province} {order.address.postalcode}</p>
                <p>Canada</p>
            </div>
            <br />
            <h2>Billing Information:</h2>
            <div className={styles.sub}>
                {order.billingSameAsShipping ? <p>Same As Shipping</p>
                    : <>
                        <p>{order.billingFirstName} {order.billingLastName}</p>
                        <p>{order.billingAddress.apt} {order.billingAddress.apt && '-'} {order.billingAddress.street}</p>
                        <p>{order.billingAddress.city} {provinces?.[order.billingAddress.province] ?? order.billingAddress.province} {order.billingAddress.postalcode}</p>
                        <p>Canada</p>
                    </>}
            </div>
            <h2>Products Ordered:</h2>
            <div className={styles.productlist}>
                {productMap ? order.products.map(({ id, count }, i) => {
                    const product = productMap[id]
                    return <div key={id}>
                        <h3>Product {i}: {id}</h3>
                        <div className={styles.sub}>
                            <p>Product Name: {product.name}</p>
                            <p>Count Ordered: {count}</p>
                            <p>Price per Count: <Dollar>{product.price}</Dollar></p>
                            <p>Total Price: <Dollar>{product.price * count}</Dollar></p>
                        </div>
                    </div>
                }) : <Spinner />}
            </div>
            <h2>Order Subtotal: <Dollar>{calculateSubtotal().toFixed(2)}</Dollar></h2>
            <h2>Order Total (Tax 13%): <Dollar>{(calculateSubtotal() * 1.13).toFixed(2)}</Dollar></h2>
        </div>
    </Center>
}
