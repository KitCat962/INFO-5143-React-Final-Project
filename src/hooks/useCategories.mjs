import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useCategories(withAll) {
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        return onSnapshot(doc(db, 'product_data/categories'), doc => {
            withAll ?
                setCategories({ all: 'All', ...doc.data() }) :
                setCategories(doc.data())
        })
    }, [])
    return categories
}
