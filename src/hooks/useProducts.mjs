import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useProducts({ category, min, max }) {
    const [products, setProducts] = useState(null)
    useEffect(() => {
        const colRef = collection(db, 'products')
        const constraints = []
        if (category && category !== 'all') constraints.push(where('category', '==', category))
        if (min) constraints.push(where('price', '>=', parseFloat(min)))
        if (max) constraints.push(where('price', '<=', parseFloat(max)))
        console.log(constraints)
        return onSnapshot(query(colRef, ...constraints), collection => setProducts(collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
    }, [category, min, max])
    return products
}
