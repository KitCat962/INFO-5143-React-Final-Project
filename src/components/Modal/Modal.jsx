import { useEffect } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Center from '../Center'
import styles from './Modal.module.scss'

export default function Modal({ visible, requestClose, children }) {
    return <Backdrop visible={visible} requestClose={requestClose}>
        <Center>
            <div onClick={e => e.stopPropagation()} className={styles.modal}>
                {children}
            </div>
        </Center>
    </Backdrop>
}
