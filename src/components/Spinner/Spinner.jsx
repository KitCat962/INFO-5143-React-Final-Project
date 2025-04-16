import checkType, { DEFAULT, ENUM } from '../../scripts/formParser.mjs'
import styles from './Spinner.module.scss'

export default function Spinner({ type }) {
    const [valid, parsedType] = checkType(DEFAULT(ENUM(
        'primary',
        'secondary',
        'tertiary',
        'positive',
        'negative'
    ), 'primary'), type)
    return <svg className={styles.spinner} width={styles.svgSize} height={styles.svgSize}>
        <circle className={[styles.curve, styles[parsedType]].filter(Boolean).join(' ')} />
    </svg>
}
