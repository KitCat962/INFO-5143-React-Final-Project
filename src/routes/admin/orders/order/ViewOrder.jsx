import { useParams } from "react-router"

export default function ViewOrder({ }) {
    const {orderID} = useParams()
    return <>
        <p>Order {orderID}</p>
    </>
}