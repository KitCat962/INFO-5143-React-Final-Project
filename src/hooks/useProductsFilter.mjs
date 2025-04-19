import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useProductsFilter({ category = null, min = null, max = null, orderBy: order_by = 'name', desc = false } = {}) {
    const [products, setProducts] = useState(null)
    useEffect(() => {
        const colRef = collection(db, 'products')
        const constraints = [orderBy(order_by, desc ? 'desc' : 'asc')]
        if (category && category !== 'all') constraints.push(where('category', '==', category))
        if (min) constraints.push(where('price', '>=', parseFloat(min)))
        if (max) constraints.push(where('price', '<=', parseFloat(max)))
        return onSnapshot(
            query(colRef, ...constraints),
            collection => setProducts(collection.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        )
    }, [category, min, max, order_by, desc])
    return products
}
