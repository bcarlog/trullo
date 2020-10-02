import React from 'react'
import styles from './styles.module.scss'

const NotFound = () => {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.image}><img src="/img/404.png" alt="404" /></div>
                <div className={styles.text}>Página no encontrada</div>
                <a className={styles.back} href="/">Regresar a casa</a>
            </div>
        </div>
    )
}

export default NotFound