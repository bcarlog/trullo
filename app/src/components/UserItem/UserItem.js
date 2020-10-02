import React from 'react'
import styles from './styles.module.scss'

const UserItem = props => {
    return (
        <div className={styles.userItem}>
            <img src={props.photo} alt="Imagen 1" className={styles.userPhoto} />
        </div>
    )
}

export default UserItem