import { useId } from 'react'
import styles from './Checkbox.module.scss'

export default function Checkbox({ formName, className, label, value, onChange }) {
    const id = useId()
    return <label htmlFor={id}
        className={[styles.checkbox, className].filter(Boolean).join(' ')}
    >
        <input name={formName}
            className={styles.input}
            id={id}
            type='checkbox'
            checked={value}
            onChange={e => onChange(e.target.checked, formName)}
        />
        <div className={styles.box}>
            <div className={[styles.dot, value && styles.checked].filter(Boolean).join(' ')} />
        </div>
        {label}
    </label>
}
