import styles from './Text.module.scss'
import InputBase from './InputBase'
import { useId, useState } from 'react'

export default function Text({ formName, className, label, placeholder, hint, disabled, value, onChange, invalid, email, password }) {
    const id = useId()
    const inputId = `${id}-input`
    const hintId = `${id}-hint`

    return <InputBase id={id} label={label} className={className} hint={hint} invalid={invalid} >
        <input
            className={styles.value}
            id={inputId}
            name={formName}
            type={password ? 'password' : email ? 'email' : 'text'}
            value={value ?? ''}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange ? e => onChange(e.target.value, formName) : null}
            aria-describedby={hint && hintId}
        />
    </InputBase>
}
