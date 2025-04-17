import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useProducts({ category = false, min = false, max = false } = {}) {
    const [productMap, setProductMap] = useState(null)
    useEffect(() => {
        const colRef = collection(db, 'products')
        const constraints = []
        if (category && category !== 'all') constraints.push(where('category', '==', category))
        if (min) constraints.push(where('price', '>=', parseFloat(min)))
        if (max) constraints.push(where('price', '<=', parseFloat(max)))
        return onSnapshot(query(colRef, ...constraints), collection => setProductMap(collection.docs.reduce((map, doc) => (map[doc.id] = { id: doc.id, ...doc.data() }) && map, {})))
    }, [category, min, max])
    return [
        productMap && Object.values(productMap),
        productMap
    ]
}
