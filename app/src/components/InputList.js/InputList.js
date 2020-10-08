import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

const InputList = ({ editable, value, onSave}) => {
    const [valueLocal, setValueLocal] = useState(value)
    const inputRef = useRef(null)

    useEffect(()=>{
        if(editable && inputRef){
            inputRef.current.focus()
        }else if(inputRef){
            inputRef.current.blur()
        }
    },[editable])

    useEffect(()=>{
        setValueLocal(value)
    },[value])

    const onPressEnter = (e) => {
        if(e.key === 'Enter'){
            inputRef.current.blur()
        }
    }

    const savehandler = () => {
        onSave(valueLocal)
    }

    return (
        <div style={{ position: 'relative' }}>
            <input 
                ref={inputRef} 
                className={styles.input} 
                value={valueLocal}
                onBlur={savehandler}
                onKeyDown={onPressEnter}
                onChange={e => setValueLocal(e.target.value)}
            />
            {editable ? null : <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, left: 0, top: 0 }}></div> }
        </div>
    )
}

export default React.memo(InputList)