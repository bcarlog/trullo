import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import styles from './styles.module.scss'

import ModalBase from '../../../../hoc/ModalBase/ModalBase'
import CoverPop from '../../../../components/CoverPop/CoverPop'
import ButtonSecondary from '../../../../components/ButtonSecondary/ButtonSecondary'
import Button from '../../../../components/Button/Button'
import Visibility from '../../../../components/Visibility/Visibility'

import { createBoard } from '../../../../services/BoardServices'

const CreateModal = props => {
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState()
    const [visibility, setVisibility] = useState('PRIVATE')
    const [showCoverPop, setShowCoverPop] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const onCreateBoard = () => {
        setLoading(true)
        const board = {
            title,
            cover: cover,
            visibility
        }
        createBoard(board)
            .then(res => history.push(`/board/${res.id}`))
            .finally(()=>setLoading(false))
    }

    return (
        <ModalBase show={props.show} onClose={props.onClose} style={{ paddingTop: '10%' }}>
            <div className={styles.modal}>
                <div className={styles.close}>
                    <Button text="X" onClick={props.onClose} />
                </div>
                <img src={cover ?? "/img/default.jpg"} className={styles.photo} alt={title}/>
                <input
                    className={styles.input}
                    placeholder="Add board title"
                    onChange={(event) => { setTitle(event.target.value) }} />
                <div className={styles.buttonCover}>
                    <ButtonSecondary icon="insert_photo" text="Cover" onClick={()=>setShowCoverPop(s => !s)}/>
                    <CoverPop
                        show={showCoverPop}
                        onClose={() => setShowCoverPop(false)}
                        onSave={({medium})=>setCover(medium)}
                    />
                </div>
                <div className={styles.buttonStatus}>
                    <Visibility value={visibility} onChange={setVisibility} editable={true}/>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.cancel} onClick={props.onClose}>Cancel</div>
                    <Button text="+ Create" onClick={onCreateBoard} loading={loading}/>
                </div>
            </div>
        </ModalBase>
    )
}

export default CreateModal