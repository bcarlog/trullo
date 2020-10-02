import React, { useState } from 'react'
import styles from './styles.module.scss'

const CardNew = props => {
    const [text, setText] = useState()

    const onPressEnter = (e) => {
        if(e.key === 'Enter'){
            props.onSave(text)
        }
    }

    return (
        <div className={styles.card}>
            <textarea 
                autoFocus 
                className={styles.input} 
                placeholder={props.placeholder ?? "Enter a title for this card..."}
                onChange={(event)=>{setText(event.target.value)}}
                onBlur={()=>props.onBlur(text)}
                onKeyDown={onPressEnter}
            />
            <div className={styles.button} onClick={()=>props.onSave(text)}>Save</div>
        </div>
    )
}

export default CardNew