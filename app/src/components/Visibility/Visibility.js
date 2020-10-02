import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

import ButtonSecondary from '../ButtonSecondary/ButtonSecondary'
import { useOutsideDetect } from '../../utils/Listeners'

const Option = props => {
    return (
        <div className={styles.option} onClick={props.onClick}>
            <h4 className={styles.name}>
                <i className="material-icons md-16">{props.icon}</i>
                <span>{props.name}</span>
            </h4>
            <div className={styles.description}>{props.description}</div>
        </div>
    )
}

const Visibility = props => {
    const [show, setShow] = useState(false)
    const [state, setState] = useState(props.value)
    const visibilityRef = useRef(null)

    useOutsideDetect(visibilityRef, setShow.bind(this, false))

    let buttonVisibility = <ButtonSecondary icon="hourglass_bottom" text="..." onClick={() => {}} />
    if(state === 'PRIVATE') {
        buttonVisibility = <ButtonSecondary icon="lock" text="Private" onClick={() => setShow(state => !state)} />
    }else if(state === 'PUBLIC'){
        buttonVisibility = <ButtonSecondary icon="public" text="Public" onClick={() => setShow(state => !state)} />
    }

    useEffect(()=>{
        setState(props.value)
        setShow(false)
    },[props.value])

    return (
        <div className={styles.visibility} ref={visibilityRef}>
            {buttonVisibility}
            {show ?
                <section className={styles.pop}>
                    <h3 className={styles.title}>Visibility</h3>
                    <div className={styles.description}>Choose who can see this board</div>
                    <div className={styles.options}>
                        <Option 
                            name="Public" 
                            description="Anyone on the internet can see this" icon="public" 
                            onClick={()=>props.onChange('PUBLIC')}/>
                        <Option 
                            name="Private" 
                            description="Only board members can see this" icon="lock"
                            onClick={()=>props.onChange('PRIVATE')} />
                    </div>
                </section>
                : null
            }
        </div>
    )
}

export default Visibility