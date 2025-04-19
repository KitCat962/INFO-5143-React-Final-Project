import styles from './Login.module.scss'
import { useState } from "react"
import Button from "../../components/Buttons/Button"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../scripts/firebase'
import Center from '../../components/Center'
import Text from '../../components/Input/Text'
import { Link, useLocation, useNavigate } from 'react-router'

export default function Login({ }) {
    const navigate = useNavigate()
    const { state } = useLocation()
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
            navigate(state?.prevLocation ?? '/')
        } catch (e) {
            console.log(e)
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    return <Center className={styles.login}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <Text formName='email' label='Email' email value={email} onChange={setEmail} />
            <Text formName='password' label='Password' password value={password} onChange={setPassword} />
            <Button disabled={loading} submit>Login</Button>
        </form>
        {error && <p className={styles.errorbox}>Invalid Credentials</p>}
        <p>Not already a user? <Link to='/signup' state={state}>Sign Up</Link></p>
    </Center>
}
