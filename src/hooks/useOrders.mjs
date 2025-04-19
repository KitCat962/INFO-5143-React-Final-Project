import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useOrders({ } = {}) {
    const [ordersMap, setOrdersMap] = useState(null)
    useEffect(() => {
        return onSnapshot(collection(db, 'orders'), collection => setOrdersMap(collection.docs.reduce((map, doc) => (map[doc.id] = { id: doc.id, ...doc.data() }) && map, {})))
    }, [])
    return [
        ordersMap && Object.values(ordersMap),
        ordersMap
    ]
}
