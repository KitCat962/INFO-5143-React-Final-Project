import styles from './Backdrop.module.scss'

export default function Backdrop({ visible, requestClose, children }) {
    if (visible)
        return <div className={styles.backdrop} onClick={requestClose}>
            {children}
        </div>
}