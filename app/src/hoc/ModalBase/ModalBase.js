import React from 'react'
import styles from './styles.module.scss'

const BackModal = props => (
    props.show ? <div className={styles.backModal} onClick={props.onClick}></div> : null
)

const ModalBase = props => {

    const classes = [styles.modalContainer]

    if (props.show === false) {
        classes.push(styles.hide)
        if(props.hide){
            return <></>
        }
    }

    return (
        <>
            <BackModal show={props.show} onClick={props.onClose}/>
            <div className={classes.join(' ')} style={{...props.style}}>
                <div className={styles.modal}>{props.children}</div>
            </div>
        </>
    )
}

export default ModalBase