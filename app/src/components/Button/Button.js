import React from 'react'
import styles from './styles.module.scss'

const Button = props => {

    const ownStyles = [styles.button, ]
    if(props.disabled){
        ownStyles.push(styles.disabled)
    }

    if(props.icon && !props.text){
        ownStyles.push(styles.square)
    }else{
        ownStyles.push(styles.small)
    }

    const onClick = () => {
        if(props.disabled){
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
            {props.text}
        </div>
    )
}

export default Button