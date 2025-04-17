import { Link } from 'react-router'
import styles from './Footer.module.scss'

export default function Footer({ }) {
    return <footer className={styles.footer}>
        <div className={styles.links}>
            <Link to='/'>Home</Link>
            <Link to='/search'>Search</Link>
            <Link to='/cart'>Cart</Link>
        </div>
        <span className={styles.copywrite}>Katt McGuinness &copy; 2025</span>
    </footer>
}
