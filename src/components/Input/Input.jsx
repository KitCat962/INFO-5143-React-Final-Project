import styles from './Input.module.scss'
import { useId } from 'react'

export default function Input({ name, type, hint, value, onChange }) {
    const id = useId()
    const inputId = `${id}-input`
    const hintId = `${id}-hint`
    return <div className={styles.input}>
        <label className={styles.label} htmlFor={inputId}>{name}</label>
        <input
            className={styles.value}
            id={inputId}
            name={name.toLowerCase()}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-describedby={hint && hintId}
        />
        {hint && <p className={styles.hint} id={hintId}>{hint}</p>}
    </div>
}