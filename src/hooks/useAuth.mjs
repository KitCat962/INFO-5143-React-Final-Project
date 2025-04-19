import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../scripts/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function useAuth() {
    // null when unattempted, false when no user, object when user
    const [user, setUser] = useState(null)
    // null when unattempted, false when not admin, true when admin
    const [admin, setAdmin] = useState(null)
    useEffect(() => onAuthStateChanged(auth, user => setUser(user ?? false)), [])
    useEffect(() => user ? onSnapshot(doc(db, 'users', user.uid), doc => setAdmin(doc.get('admin') ?? false)) : undefined, [user])
    return [user, admin]
}
