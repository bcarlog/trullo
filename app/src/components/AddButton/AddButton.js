import React from 'react'
import styles from './styles.module.scss'

const AddButton = props => {
    return (
        <div className={styles.addButton} onClick={props.onClick}>
            <span>{props.title}</span>
            <i className="material-icons md-16">add</i>
        </div>
    )
}

export default AddButton