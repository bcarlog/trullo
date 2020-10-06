import React from 'react'
import styles from './styles.module.scss'

const ListSaving = ({title}) => {
    return (
        <div
            className={styles.list}
        >
                <div className={styles.saving}></div>
            <div className={styles.head} >
                
                <h2 className={styles.title}>{title}</h2>
            </div>
        </div>
    )
}

export default ListSaving