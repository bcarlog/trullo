import React, { useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { useOutsideDetect } from '../../utils/Listeners'
import styles from './styles.module.scss'

const Options = ({ values = [], actions = [], onClose }) => {
    const ref = useRef(null)
    useOutsideDetect(ref, onClose)

    return (
        <div ref={ref} className={styles.options}>
            {values.map((value, index) => (
                <div key={uuid()} className={styles.option} onClick={actions[index]}>{value}</div>
            ))}
        </div>
    )
}

export default Options