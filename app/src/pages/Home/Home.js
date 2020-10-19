import React from 'react'
import styles from './styles.module.scss'

import Header from '../../containers/Header/Header'
import OwnBords from './components/OwnBords'
import PublicBoards from './components/PublicBoards'
import { useSelector } from 'react-redux'
import { useBoards } from './hooks'
import MessageLogin from './components/MessageLogin/MessageLogin'

const Home = props => {
    const { isAuthenticated } = useSelector(state => state.user)
    const { loading, ownBoards, publicBoards } = useBoards({ isAuthenticated })

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.mainBase}>
                {isAuthenticated ? <OwnBords boards={ownBoards} isLoading={loading} />: <MessageLogin/>}
                <PublicBoards boards={publicBoards} isLoading={loading} />
            </div>
        </div>
    )
}

export default Home