import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

import Header from '../../containers/Header/Header'
import OwnBords from './components/OwnBords'
import PublicBoards from './components/PublicBoards'
import { useSelector } from 'react-redux'
import { getOwnBoards, getPublicBoards } from '../../services/BoardServices'

const Home = props => {
    const [ownBoards, setOwnBoards] = useState([])
    const [publicBoards, setPublicBoards] = useState([])
    const [loading, setLoading] = useState(true)
    const { isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated) {
            getOwnBoards().then(data => {
                setOwnBoards(data)
                setLoading(false)
            })
            getPublicBoards().then(data => {
                setPublicBoards(data)
                setLoading(false)
            })
        }
    }, [isAuthenticated])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.mainBase}>
                {isAuthenticated ?
                    <>
                        <OwnBords boards={ownBoards} isLoading={loading} />
                        <PublicBoards boards={publicBoards} isLoading={loading}/>
                    </>
                    : <h3>Login please</h3>
                }
            </div>
        </div>
    )
}

export default Home