import Button from '../Buttons/Button'
import styles from './File.module.scss'
import { useId, useRef } from 'react'
import defaultImage from '../../assets/defaultImage.png'

export default function File({ formName, className, label, hint, value, onChange, image }) {
    const id = useId()
    const inputId = `${id}-input`
    // const hintId = `${id}-hint`

    const handleChange = newfile => {
        if (onChange)
            onChange(newfile, formName)
    }

    return <div className={[styles.file, className].filter(Boolean).join(' ')} >
        <label className={styles.label} htmlFor={inputId} onClick={e => e.currentTarget.click()}>
            <div className={styles.divider}>
                {label}
                <Button className={styles.squish} >Browse</Button>
            </div>
            {image && <img className={styles.image}
                src={value ? URL.createObjectURL(value) : defaultImage}
            />}
        </label>
        <input
            className={styles.input}
            id={inputId}
            name={formName}
            type='file'
            accept={image ? 'image/*' : null}
            onChange={e => handleChange(e.target.files[0])}
        // aria-describedby={hint && hintId}
        />
    </div>
}
