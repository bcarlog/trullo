import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'

const Comment = () => {
    return (
        <div className={styles.userComment}>
            <div className={styles.userHead}>
                <div className={styles.userDetail}>
                    <div className={styles.userPhotoContainer}>
                        <img src="/img/default.jpg" className={styles.userPhoto}/>
                    </div>
                    <div className={styles.userDataContainer}>
                        <h4 className={styles.userName}>Carlos Yucra</h4>
                        <div className={styles.userDate}>24 de Julio del 2020</div>
                    </div>
                </div>
                <div></div>
            </div>
            <div className={styles.text}>Texto</div>
        </div>
    )
}

const Comments = ({ }) => {
    const { photo } = useSelector(state => state.user)

    return (
        <div className={styles.comments}>
            <div className={styles.comment}>
                <div className={styles.photoContainer}>
                    <img src={photo} className={styles.photo} />
                </div>
                <div className={styles.writeContainer}>
                    <Textarea placeholder="Write a comment" height={70} />
                    <Button text="Comment" />
                </div>
            </div>
            <div>
                <Comment/>
                <Comment/>
            </div>
        </div>
    )
}

export default Comments