import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useProductMap({ } = {}) {
    const [productsMap, setProductMap] = useState(null)
    useEffect(() => onSnapshot(
        collection(db, 'products'),
        collection => setProductMap(
            collection.docs.reduce((map, doc) => (
                map[doc.id] = { id: doc.id, ...doc.data() }
            ) && map, {})
        )
    ), [])
    return productsMap
}
