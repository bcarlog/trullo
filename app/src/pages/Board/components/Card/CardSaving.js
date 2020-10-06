import React from 'react'
import styles from './styles.module.scss'

const CardSaving = ({title}) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.saving}></div>
                <div className={styles.title}>{title}</div>
            </div>
        </div>
    )
}

export default CardSaving