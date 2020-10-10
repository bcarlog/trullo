import React from 'react'
import PropTypes from 'prop-types';
import styles from './styles.module.scss'

const ButtonSecondary = ({disabled, text, icon, type, onClick}) => {
    const classes = [styles.button]
    if(type === 'warning'){
        classes.push(styles.warning)
    }
    const onClickHandler = () => {
        if (disabled) {
            return
        }
        onClick()
    }

    return (
        <div onClick={onClickHandler} className={classes.join(' ')}>
            <i className="material-icons md-16">{icon}</i>
            <span>{text}</span>
        </div>
    )
}

ButtonSecondary.propTypes = {
    disabled: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func
}

ButtonSecondary.defaultProps = {
    onClick: ()=>{}
}

export default ButtonSecondary