import styles from './Header.module.scss'

export default function Header({}) {
    return <header className = {styles.header}>
        <span className = {styles.title}>Header</span>
    </header>
}