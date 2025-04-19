import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useProducts({ category = false, min = false, max = false, orderBy: order_by = 'name', desc = false } = {}) {
    const [productMap, setProductMap] = useState(null)
    useEffect(() => {
        const colRef = collection(db, 'products')
        const constraints = [orderBy(order_by, desc ? 'desc' : 'asc')]
        if (category && category !== 'all') constraints.push(where('category', '==', category))
        if (min) constraints.push(where('price', '>=', parseFloat(min)))
        if (max) constraints.push(where('price', '<=', parseFloat(max)))
        return onSnapshot(query(colRef, ...constraints), collection => setProductMap(collection.docs.reduce((map, doc) => (map[doc.id] = { id: doc.id, ...doc.data() }) && map, {})))
    }, [category, min, max, order_by, desc])
    return [
        productMap && Object.values(productMap),
        productMap
    ]
}
