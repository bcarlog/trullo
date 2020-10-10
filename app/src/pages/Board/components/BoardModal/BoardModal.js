import React, { useState } from "react"
import Textarea from "../../../../components/Textarea/Textarea"
import styles from './styles.module.scss'

const BoardModal = ({editable}) => {
    const [description, setDescription] = useState('')
    const [editTextArea, setEditTextArea] = useState(false)

    const onSaveBoard = () => {

    }

    return (
        <div className={styles.boardModal}>
            <div className={styles.head}>
                <input className={styles.input} value="Devchallenges Board" />
                <i className="material-icons md-16">close</i>
            </div>
            <div className={styles.user}>
                <div className={styles.label}><i className="material-icons md-16">group</i> <span>Made by</span></div>
                <div className={styles.userDetail}>
                    <div className={styles.userPhotoContainer}>
                        <img src="/img/default.jpg" className={styles.userPhoto} />
                    </div>
                    <div className={styles.userDataContainer}>
                        <h4 className={styles.userName}>Carlos Yucra</h4>
                        <div className={styles.userDate}>24 de Julio del 2020</div>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <h4><i className="material-icons md-16">description</i> Description</h4>
                {editable ?
                    <div className={styles.buttonContainer} onClick={() => setEditTextArea(true)}>
                        <div className={styles.button}><i className="material-icons md-16">create</i>  Edit</div>
                    </div> : null
                }
                <Textarea value={description} onChange={setDescription} onSave={onSaveBoard} isEditable={editTextArea} editable={editable} />
            </div>
        </div>
    )
}

export default BoardModal