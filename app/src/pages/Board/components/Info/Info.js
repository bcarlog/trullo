import React from 'react'
import styles from './styles.module.scss'

const Info = ({ text, onClose }) => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.info}>
                {text}
            </div>
            <div className={styles.close} onClick={onClose}>
                <i className="material-icons md-16">close</i>
            </div>
        </div>
    )
}

export default Info