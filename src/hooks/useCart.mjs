import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../scripts/firebase";

export default function useCart(user) {
    if (user === undefined) throw 'useCart: user is undefined. Did you forget to provide it from useAuth?'
    const [cart, setCart] = useState(null)
    useEffect(() => user ? onSnapshot(collection(db, 'users', user.uid, 'cart'), collection => setCart(collection.docs.map(doc => doc.data()))) : setCart(false), [user])

    const setProduct = async (id, count, increment = false) => {
        if (!user) throw 'useCart (setProduct): Must be authenticated'
        if (!cart) throw 'useCart (setProduct): Wait for the cart to be loaded before trying to set anything'
        if (!id) throw 'useCart (setProduct): Missing id'
        if (count == null) throw 'useCart (setProduct): Missing count'
        count = parseInt(count, 10)
        const cartproduct = cart.find(cartproduct => cartproduct.id === id)
        if (!cartproduct && count <= 0) return
        if (!cartproduct && count > 0) {
            await setDoc(doc(db, 'users', user.uid, 'cart', id), { id, count })
            return
        }
        if (count <= 0) {
            await deleteDoc(doc(db, 'users', user.uid, 'cart', id))
            return
        }
        if (increment)
            await setDoc(doc(db, 'users', user.uid, 'cart', id), { id, count: cartproduct.count + count })
        else
            await setDoc(doc(db, 'users', user.uid, 'cart', id), { id, count })
    }
    const resetCart = () => {
        if (!user) throw 'useCart (resetCart): Must be authenticated'
        if (!cart) throw 'useCart (resetCart): Wait for the cart to be loaded before trying to set anything'
        return cart.forEach(({ id, count }) => deleteDoc(doc(db, 'users', user.uid, 'cart', id)))
    }
    return [cart, setProduct, resetCart]
}
