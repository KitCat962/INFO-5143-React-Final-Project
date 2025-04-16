import styles from './Text.module.scss'
import InputBase from './InputBase'
import { useId } from 'react'

export default function Text({ formName, className, label, hint, value, onChange, email, password }) {
    const id = useId()
    const inputId = `${id}-input`
    const hintId = `${id}-hint`

    return <InputBase id={id} label={label} className={className} hint={hint} >
        <input
            className={styles.value}
            id={inputId}
            name={formName}
            type={password ? 'password' : email ? 'email' : 'text'}
            value={value ?? ''}
            onChange={onChange ? e => onChange(e.target.value, e.target.name) : null}
            aria-describedby={hint && hintId}
        />
    </InputBase>
}
