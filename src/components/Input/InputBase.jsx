import styles from './InputBase.module.scss'

export default function InputBase({ id, label, className, hint, invalid, children }) {
    const inputId = `${id}-input`
    const hintId = `${id}-hint`
    return <div className={[styles.input, className].filter(Boolean).join(' ')}>
        {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
        {children}
        {hint && <p className={[styles.hint, invalid && styles.invalid].filter(Boolean).join(' ')} id={hintId}>{hint}</p>}
    </div>
}
