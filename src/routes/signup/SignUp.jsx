import styles from './SignUp.module.scss'
import { useState } from "react"
import Button from "../../components/Buttons/Button"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../scripts/firebase'
import Center from '../../components/Center'
import Text from '../../components/Input/Text'
import checkType, { AND, checkInvalid, EMAIL, STRING } from '../../scripts/formParser.mjs'
import { Link, useNavigate } from 'react-router'

// 8 characters, one letter, one number
// https://stackoverflow.com/a/21456918/25120582
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export default function SignUp({ }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const formType = {
        email: EMAIL,
        password: AND(STRING, v => [passwordRegex.test(v), v])
    }
    const [invalid, setInvalid] = useState({})

    const handleChange = (value, name) => {
        const newFormData = { ...formData, [name]: value }
        setFormData(newFormData)
        setInvalid({ ...invalid, [name]: checkInvalid(formType[name], value) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const [allValid, formParsed] = checkType(formType, formData)
        if (!allValid) {
            setInvalid(checkInvalid(formType, formData))
            return
        }
        setLoading(true)
        try {
            setError(false)
            await createUserWithEmailAndPassword(auth, formParsed.email, formParsed.password)
            navigate('/')
        } catch (e) {
            Object.entries(e).forEach(console.log)
            switch (e.code) {
                case 'auth/email-already-in-use': { setError('User already exists'); break; }
                default: { setError('Something went wrong'); break; }
            }

        } finally {
            setLoading(false)
        }
    }

    return <Center className={styles.login}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <Text formName='email'
                label='Email'
                value={formData.email}
                onChange={handleChange}
                invalid={invalid.email}
                hint='Email must be valid'
                email
            />
            <Text formName='password'
                label='Password'
                value={formData.password}
                onChange={handleChange}
                invalid={invalid.password}
                hint='Password must be 8 characters long with at least 1 letter and 1 digit'
                password
            />
            <Button disabled={loading} submit>Login</Button>
        </form>
        {error && <p className={styles.errorbox}>{error}</p>}
        <p>Already a user? <Link to='/login'>Login</Link></p>
    </Center>
}
