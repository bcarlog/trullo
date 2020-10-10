import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Draggable } from 'react-beautiful-dnd'
import styles from './styles.module.scss'

import CardModal from '../CardModal'

const Card = ({ id, index, isDragDisabled, title, coverSmall, coverMedium, description, labels = [], editable, onRemove }) => {
    const [showModal, setShowModal] = useState(false)
    const [_title, _setTitle] = useState(title)
    const [_coverSmall, _setCoverSmall] = useState(coverSmall)
    const [_labels, _setLabels] = useState(labels)
    const ref = useRef(null)

    useEffect(() => {
        _setTitle(title)
        _setCoverSmall(coverSmall)
        _setLabels(labels)
    }, [title, coverSmall, labels])


    return (
        <>
        <Draggable draggableId={id} index={index} isDragDisabled={!editable || isDragDisabled}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={styles.container}
                    onClick={() => setShowModal(true)}
                >
                    <div
                        ref={ref}
                        className={[styles.card, snapshot.isDragging && !snapshot.isDropAnimating ? styles.moving: ''].join(' ')}>
                        <div>
                            {_coverSmall ? <img src={_coverSmall} className={styles.cover} alt={_title} draggable={false}/> : null}
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
                    </div>

                </div>
            )}
        </Draggable>
        <CardModal
                show={showModal}
                onClose={() => setShowModal(false)}
                cardId={id}
                titleP={title}
                coverSmallP={coverSmall}
                coverMediumP={coverMedium}
                descriptionP={description}
                labelsP={labels}
                editable={editable}
                onRemove={onRemove}

                onChangeTitleP={_setTitle}
                onChangeCoverSmallP={_setCoverSmall}
                onChangeLabelsP={_setLabels}
            />
        </>
    )
}

export default Card