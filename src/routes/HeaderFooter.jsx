import { useState } from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router"

export default function HeaderFooter() {
    const [cart, setCart] = useState([])
    const setProduct = (id, count) => {
        if (!id) throw 'Cart (setProduct): Missing id'
        if (!id) throw 'Cart (setProduct): Missing count'
        count = parseInt(count, 10)
        const cartproductIndex = cart.findIndex(cartproduct => cartproduct.id === id)
        if (cartproductIndex === -1 && count <= 0) return
        if (cartproductIndex === -1 && count > 0) {
            setCart([...cart, { id, count }])
            return
        }
        if (count <= 0) {
            setCart(cart.toSpliced(cartproductIndex, 1))
            return
        }
        cart[cartproductIndex].count = count
        setCart([...cart])
    }
    const useCart = [cart, setProduct]
    return <>
        <Header useCart={useCart} />
        <Outlet context={{ useCart }} />
        <Footer />
    </>
}
