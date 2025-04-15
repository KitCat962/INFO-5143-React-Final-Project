import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useOutlet } from "react-router";
import { auth } from "../../scripts/firebase";

export default function AuthWrapper({ }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [authAttempted, setAuthed] = useState(false)
    useEffect(()=>{
        console.log('location', location)
    }, [location])
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log('user', user)
            setUser(user)
            if(!user){
                setAuthed(true)
                navigate('/admin')
            }
        })
    }, [])
    return <Outlet context={{authAttempted, user}}/>
}