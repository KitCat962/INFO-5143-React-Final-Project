import styles from './Search.module.scss'
import { FaSearch } from "react-icons/fa";

export default function Search({ className, value, onChange, onEnter }) {
    return <label className={[styles.search, className].filter(Boolean).join(' ')}>
        <FaSearch className={styles.icon} />
        <input
            className={styles.text}
            type="text"
            placeholder="Search"
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            onKeyDown={e => onEnter && e.code === 'Enter' && onEnter(e.target.value)}
        />
    </label>
}
