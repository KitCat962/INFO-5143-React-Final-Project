import styles from './Button.module.scss'
import checkType, { DEFAULT, ENUM } from '../../scripts/formParser.mjs'

export default function Button({ children, onClick, type, submit, disabled }) {
    const [valid, parsedType] = checkType(DEFAULT(ENUM(
        'primary',
        'secondary',
        'tertiary',
        'positive',
        'negative'
    ), 'primary'), type)
    console.log(styles[parsedType])
    return <button type={submit?'submit':'button'} className={[styles.button, styles[parsedType]].join(' ')} onClick={onClick} disabled={disabled}>
        {children}
    </button>
}