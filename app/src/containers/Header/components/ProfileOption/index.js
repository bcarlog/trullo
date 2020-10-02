import React from 'react'
import styles from './styles.module.scss'

const ProfileOption = ({color, icon, text, onClick}) => {
    return (
        <div className={styles.option} style={{color: color ?? 'inherit'}} onClick={onClick}>
            <i className="material-icons md-16">{icon}</i>
            <span>{text}</span>
        </div>
    )
}

export default ProfileOption