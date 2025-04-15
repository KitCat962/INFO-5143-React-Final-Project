import './Login.scss'
import { useState } from "react"
import EmailInput from "../../../components/TextInput/EmailInput"
import PasswordInput from "../../../components/TextInput/PasswordInput"
import Button from "../../../components/Buttons/Button"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../scripts/firebase'

export default function Login({ }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(false)
            const response = await signInWithEmailAndPassword(auth, email, password)
            //AuthWrapper will move to the dashboard here
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    return <div className="login">
        <div style={{ flexGrow: 1 }} />
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
            <EmailInput id='email' value={email} onChange={setEmail} />
            <PasswordInput id='password' value={password} onChange={setPassword} />
            <Button disabled={loading} submit>Text</Button>
        </form>
        {error && <p className='errorbox'>Invalid Credentials</p>}
        <div style={{ flexGrow: 1 }} />
    </div>
}