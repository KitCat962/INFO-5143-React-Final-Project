import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Button from '../Buttons/Button'
import styles from './Number.module.scss'
import InputBase from './InputBase'
import { useId } from 'react'

export default function Number({ formName, className, label, hint, value, onChange, min, max, step = 1 }) {
    const id = useId()
    const inputId = `${id}-input`
    const hintId = `${id}-hint`

    const handleIncrement = increment => {
        if (value != value) value = 0
        let newValue = value + increment
        if (min != null && newValue < min)
            newValue = min
        else if (max != null && newValue > max)
            newValue = max
        onChange(newValue, formName)
    }
    return <InputBase className={className} id={id} label={label} hint={hint} >
        <div className={styles.number}>
            <input
                className={styles.value}
                id={inputId}
                name={formName}
                type='number'
                value={value ?? 0}
                onChange={onChange ? e => onChange(e.target.value, e.target.name) : null}
                aria-describedby={hintId}

                min={min}
                max={max}
                step={step}
            />
            <div className={styles.buttongroup}>
                <Button className={styles.squish} onClick={() => handleIncrement(step)}>
                    <FaChevronUp />
                </Button>
                <Button className={styles.squish} onClick={() => handleIncrement(-step)}>
                    <FaChevronDown />
                </Button>
            </div>
        </div>
    </InputBase>
}