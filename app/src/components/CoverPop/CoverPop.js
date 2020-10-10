import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import Skeleton from 'react-loading-skeleton'
import styles from './CoverPop.module.scss'

import { useOutsideDetect } from '../../utils/Listeners'
import { useImages } from './Hooks'

const CoverPop = ({ show, onClose, onSave }) => {
    const [query, setQuery] = useState()
    const { loading, images } = useImages({ query })
    const ref = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (show && inputRef) {
            inputRef.current.focus()
        }
    }, [show])

    const resetData = () => {
        if (show) {
            setQuery(null)
            onClose()
        }
    }
    
    useOutsideDetect(ref, resetData)

    if (!show) {
        return <></>
    }

    const onSearchHandler = () => {
        setQuery(inputRef.current.value)
    }

    const onSaveHandler = ({small, medium}) => {
        onSave({ small, medium })
        onClose()
    }

    return (
        <section className={styles.pop} ref={ref}>
            <h3 className={styles.title}>Photo Search</h3>
            <div className={styles.description}>Search Pixabay for photos</div>
            <div className={styles.search}>
                <input
                    ref={inputRef}
                    className={styles.input}
                    placeholder="Keywords..."
                    onKeyDown={({ key }) => key === 'Enter' ? onSearchHandler() : null}
                />
                <Button icon="search" onClick={onSearchHandler} />
            </div>
            <div className={styles.photos}>
                {loading ?
                    [1,2,3,4,5,6,7,8,9,11,12].map(i => <div key={i} className={styles.photo}><Skeleton height="100%" /> </div>)
                    :
                    images.map(photo => (
                        <img
                            key={"photo-" + photo.id}
                            src={photo.previewURL}
                            alt={"photo-" + photo.id}
                            className={styles.photo}
                            onClick={()=>onSaveHandler({ small: photo.previewURL, medium: photo.previewURL.replace('150.jpg', '960_720.jpg') })}
                        />
                    ))}
            </div>
        </section>
    )
}

export default CoverPop