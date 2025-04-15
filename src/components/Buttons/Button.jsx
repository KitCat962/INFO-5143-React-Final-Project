import styles from './Button.module.scss'
import checkType, { DEFAULT, ENUM } from '../../scripts/formParser.mjs'

export default function Button({ children, onClick, type, submit, disabled, className }) {
    const [_, parsedType] = checkType(DEFAULT(ENUM(
        'primary',
        'secondary',
        'tertiary',
        'positive',
        'negative'
    ), 'primary'), type)
    return <button type={submit ? 'submit' : 'button'} className={[styles.button, styles[parsedType], className].filter(Boolean).join(' ')} onClick={onClick} disabled={disabled}>
        {children}
    </button>
}