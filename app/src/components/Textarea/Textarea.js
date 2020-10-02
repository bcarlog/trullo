import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

const Textarea = ({ value , height, isEditable, onChange, onSave, placeholder = "", }) => {
    const [edit, setEdit] = useState(isEditable ?? false)
    const ref = useRef(null)

    useEffect(()=>{
        if(isEditable){
            setEdit(true)
        }
    },[isEditable])

    useEffect(()=>{
        if(edit && ref){
            ref.current.focus()
        }
    },[edit])

    const onPressEnter = (e) => {
        if(e.key === 'Enter'){
            onSaveHandler()
        }
    }

    const onSaveHandler = () => {
        if(edit){
            setEdit(false)
            onSave()
        }
    }

    return (
        <div className={styles.container}>
            <textarea 
                ref={ref}
                disabled={!edit}
                value={value ?? ""}
                className={styles.textarea}
                placeholder={placeholder}
                style={{ height }}
                onChange={e => onChange(e.target.value)}
                onBlur={onSaveHandler}
                onKeyDown={onPressEnter}
            />
            {!edit ?
                <div className={styles.content} onClick={() => setEdit(true)}></div>
                : null
            }
        </div>
    )
}

export default Textarea