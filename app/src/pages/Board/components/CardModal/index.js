import React, { useState } from 'react'
import styles from './styles.module.scss'

import { updateCard } from '../../../../services/CardServices'
import ModalBase from '../../../../hoc/ModalBase/ModalBase'
import Button from '../../../../components/Button/Button'
import ButtonSecondary from '../../../../components/ButtonSecondary/ButtonSecondary'
import Textarea from '../../../../components/Textarea/Textarea'
import LabelsPop from './components/LabelsPop'
import CoverPop from '../../../../components/CoverPop/CoverPop'

const CardModal = ({ cardId, titleP, coverSmallP, coverMediumP, descriptionP, labelsP, show, onClose, onChangeTitleP, onChangeCoverSmallP, onChangeLabelsP, editable }) => {
    const [popToShow, setPopToShow] = useState(null)
    const [editTextArea, setEditTextArea] = useState(false)
    const [cover, setCover] = useState({ small: coverSmallP, medium: coverMediumP })
    const [title, setTitle] = useState(titleP)
    const [description, setDescription] = useState(descriptionP)
    const [labels, setLabels] = useState(labelsP)

    const onSaveCard = ({ _labels = labels, _cover = cover } = {}) => {
        if (!editable) return
        updateCard({ cardId, title, description, coverSmall: _cover.small, coverMedium: _cover.medium, labels: _labels })
        onChangeTitleP(title)
        onChangeCoverSmallP(_cover.small)
        onChangeLabelsP(_labels)
    }

    const onSaveLabel = (label) => {
        const newLabels = [...labels, label]
        onSaveCard({ _labels: newLabels })
        setLabels(newLabels)
    }

    const onSaveCover = ({ small, medium }) => {
        onSaveCard({ _cover: { small, medium } })
        setCover({ small, medium })
        setPopToShow(null)
    }

    const onPressEnter = (e) => {
        if (e.key === 'Enter') {
            onSaveCard()
            document.activeElement.blur()
        }
    }

    return (
        <ModalBase show={show} onClose={onClose} style={{ paddingTop: '5%' }} hide>
            <div className={styles.modal}>
                <div className={styles.close}>
                    <Button text="X" onClick={onClose} />
                </div>
                <div className={styles.content}>
                    <img src={cover.medium ?? '/img/default.jpg'} className={styles.image} alt={title} />
                    <div className={styles.details}>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={styles.title}
                            onBlur={onSaveCard}
                            onKeyDown={onPressEnter}
                            disabled={!editable}
                        />
                        <div className={styles.subTitle}>in list <span>In progress</span></div>
                        <div className={styles.detail}>
                            <h4><i className="material-icons md-16">description</i> Description</h4>
                            {editable ?
                                <div className={styles.buttonContainer} onClick={() => setEditTextArea(true)}>
                                    <div className={styles.button}><i className="material-icons md-16">create</i>  Edit</div>
                                </div> : null
                            }
                            <Textarea value={description} onChange={setDescription} onSave={onSaveCard} isEditable={editTextArea} editable={editable}/>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <h4><i className="material-icons md-16">account_circle</i> Actions</h4>
                        <div style={{ position: 'relative' }}>
                            <ButtonSecondary text="Labers" icon="label" onClick={() => setPopToShow('labels')} disabled={!editable}/>
                            <LabelsPop
                                show={popToShow === 'labels'}
                                onClose={() => setPopToShow(null)}
                                labels={labels}
                                onSave={onSaveLabel}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <ButtonSecondary text="Cover" icon="photo" onClick={() => setPopToShow('cover')} disabled={!editable}/>
                            <CoverPop
                                show={popToShow === 'cover'}
                                onClose={() => setPopToShow(null)}
                                onSave={onSaveCover}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ModalBase>
    )
}

export default CardModal