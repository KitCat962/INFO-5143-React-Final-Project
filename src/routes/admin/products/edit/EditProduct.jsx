import { useParams } from "react-router"

export default function EditProduct({ }) {
    const {productID} =  useParams()
    return <>
        <p>EditProduct {productID}</p>
    </>
}