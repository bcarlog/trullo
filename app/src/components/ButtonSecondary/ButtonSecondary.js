import React from 'react'
import styles from './styles.module.scss'

const ButtonSecondary = props => {
    return (
        <div onClick={props.onClick} className={styles.button + " " + styles.small}>
            <i className="material-icons md-16">{props.icon}</i>
            <span>{props.text}</span>
        </div>
    )
}

export default ButtonSecondary