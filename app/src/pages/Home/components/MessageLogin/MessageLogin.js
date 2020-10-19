import React from 'react'
import styles from './styles.module.scss'

const MessageLogin = () => {

    return (
        <div className={styles.noLoginMessage}>
            <div className={styles.message}>Login to create a Board</div>
        </div>
    )
}

export default MessageLogin