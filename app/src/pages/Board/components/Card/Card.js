import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import styles from './styles.module.scss'

import CardModal from '../CardModal'

const Card = ({ id, title, coverSmall, coverMedium, description, labels = [], hide, onDrag, order, onDragEnd, onChangeCardTmp }) => {
    const [showModal, setShowModal] = useState(false)
    const [_title, _setTitle] = useState(title)
    const [_coverSmall, _setCoverSmall] = useState(coverSmall)
    const [_labels, _setLabels] = useState(labels)
    const ref = useRef(null)

    useEffect(()=>{
        _setTitle(title)
        _setCoverSmall(coverSmall)
        _setLabels(labels)
    },[title, coverSmall, labels])

    const onDragEnter = (e, pos) => {
        e.preventDefault()
        onChangeCardTmp(order + pos)
    }

    return (
        <>
            <div
                className={styles.container}
                style={{ position: hide ? 'absolute' : 'relative', visibility: hide ? 'hidden' : 'visible' }}
                onClick={() => setShowModal(true)}
                onDragOver={e => e.preventDefault()}
                onDragEnd={onDragEnd}
            >
                <div
                    ref={ref}
                    className={styles.card}
                    draggable
                    onDrag={() => onDrag({ height: ref ? ref.current.clientHeight : 49 })}>
                    <div>
                        {_coverSmall ? <img src={_coverSmall} className={styles.cover} alt={_title}/> : null}
                        <div className={styles.title}>{_title}</div>
                        <div className={styles.labels}>
                            {_labels.map(({ label, color }) => (
                                <div
                                    key={uuid()}
                                    className={styles.label}
                                    style={{ backgroundColor: color }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div onDragEnter={(e) => onDragEnter(e, 0)} style={{ width: '100%', position: 'absolute', top: 0, left: 0, height: '50%' }}>&nbsp;</div>
                    <div onDragEnter={(e) => onDragEnter(e, +1)} style={{ width: '100%', position: 'absolute', top: '50%', left: 0, height: '50%' }}>&nbsp;</div>
                </div>

            </div>
            <CardModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                cardId={id} 
                titleP={title} 
                coverSmallP={coverSmall} 
                coverMediumP={coverMedium} 
                descriptionP={description} 
                labelsP={labels}
                
                onChangeTitleP={_setTitle}
                onChangeCoverSmallP={_setCoverSmall}
                onChangeLabelsP={_setLabels}
            />
        </>
    )
}

export default React.memo(Card)