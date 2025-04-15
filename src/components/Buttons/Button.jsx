import './Button.scss'
import checkType, { DEFAULT, ENUM } from '../../scripts/formParser.mjs'

export default function Button({ children, onClick, type, submit, disabled }) {
    const [valid, parsedType] = checkType(DEFAULT(ENUM(
        'primary',
        'secondary',
        'tertiary',
        'positive',
        'negative'
    ), 'primary'), type)
    return <button type={submit?'submit':'button'} className={`button ${parsedType}`} onClick={onClick} disabled={disabled}>
        {children}
    </button>
}