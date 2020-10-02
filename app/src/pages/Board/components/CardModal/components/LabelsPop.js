import React, { useRef, useState } from 'react'
import Button from '../../../../../components/Button/Button'
import { v4 as uuid } from 'uuid'
import styles from './LabelsPop.module.scss'

import { useOutsideDetect } from '../../../../../utils/Listeners'

const LabelsPop = ({ show, onClose, onSave, labels }) => {
    const [label, setLabel] = useState('')
    const [color, setColor] = useState()
    const ref = useRef(null)
    const colors = ['#219653', '#F2C94C', '#F2994A', '#EB5757', '#2F80ED', '#56CCF2', '#6FCF97', '#333333', '#4F4F4F', '#828282', '#BDBDBD', '#E0E0E0']

    const resetData = () => {
        if (show) {
            setLabel('')
            setColor(null)
            onClose()
        }
    }
    useOutsideDetect(ref, resetData)

    if (!show) {
        return <></>
    }

    const saveLabelHandler = () => {
        onSave({label, color})
        setLabel('')
        setColor(null)
    }

    return (
        <section className={styles.pop} ref={ref}>
            <h3 className={styles.title}>Label</h3>
            <div className={styles.description}>Select a name and a color</div>
            <div className={styles.search}>
                <input 
                    className={styles.input} 
                    value={label} 
                    placeholder="Label..." 
                    onChange={(event) => { setLabel(event.target.value) }}
                    onKeyDown={({ key }) => key === 'Enter' && label && color ? saveLabelHandler() : null}
                />
            </div>
            <div className={styles.labels}>
                {colors.map(item => (
                    <div key={item} className={styles.label} style={{ backgroundColor: item }} onClick={() => setColor(item)}>
                        {item === color ?
                            <i className="material-icons md-16">check</i>
                            : null}
                    </div>
                ))}
            </div>
            <div className={styles.ownLabelsContainer}>
                <h5 className={styles.ownLabelsTitle}>Available</h5>
                <div className={styles.ownLabels}>
                    {labels.map(({label, color}) => (
                        <div 
                            key={uuid()} 
                            className={styles.ownLabel}
                            style={{backgroundColor: color}}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.button}>
                <Button text="Add" onClick={saveLabelHandler} disabled={!label || !color} />
            </div>
        </section>
    )
}

export default LabelsPop