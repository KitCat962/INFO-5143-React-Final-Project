import { doc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../scripts/firebase"

export default function useCategory(categoryID) {
    const [categoryName, setCategoryName] = useState(null)
    useEffect(() => {
        if (!categoryID) return
        return onSnapshot(doc(db, 'product_data/categories'), doc => setCategoryName(doc.get(categoryID) ?? false))
    }, [categoryID])
    return categoryName
}
