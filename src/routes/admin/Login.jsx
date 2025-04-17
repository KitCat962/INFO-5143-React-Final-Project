import styles from './Login.module.scss'
import { useState } from "react"
import Button from "../../components/Buttons/Button"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../scripts/firebase'
import Center from '../../components/Center'
import Text from '../../components/Input/Text'

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
    return <Center className={styles.login}>
        <div style={{ flexGrow: 1 }} />
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
            <Text name='Email' email value={email} onChange={setEmail} />
            <Text name='Password' password value={password} onChange={setPassword} />
            <Button disabled={loading} submit>Login</Button>
        </form>
        {error && <p className={styles.errorbox}>Invalid Credentials</p>}
        <div style={{ flexGrow: 1 }} />
    </Center>
}
