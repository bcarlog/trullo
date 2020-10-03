import React from 'react'
import styles from './styles.module.scss'

const Button = props => {

    const ownStyles = [styles.button, ]
    if(props.disabled || props.loading){
        ownStyles.push(styles.disabled)
    }

    if(props.icon && !props.text){
        ownStyles.push(styles.square)
    }else{
        ownStyles.push(styles.small)
    }

    const onClick = () => {
        if(props.disabled || props.loading){
            return
        }
        props.onClick()
    }

    return (
        <div 
            onClick={onClick} 
            className={ownStyles.join(' ')}
        >
            {props.icon ? <i className="material-icons md-16">{props.icon}</i> : null}
            {props.loading ? 'Creating' : props.text}
        </div>
    )
}

export default Button