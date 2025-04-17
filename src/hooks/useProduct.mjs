import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../scripts/firebase"
import { useEffect, useState } from "react"

export default function useProduct(id) {
    const [product, setProduct] = useState(null)
    useEffect(() => {
        return onSnapshot(doc(db, 'products', id), doc => setProduct(doc.exists() ? { id: doc.id, ...doc.data() } : false))
    }, [id])
    return product
}
