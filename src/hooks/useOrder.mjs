import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useOrder(id) {
    const [order, setOrder] = useState(null)
    useEffect(() => {
        return onSnapshot(doc(db, 'orders', id), doc => setOrder(doc.exists() ? { id: doc.id, ...doc.data() } : false))
    }, [id])
    return order
}
