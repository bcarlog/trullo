import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'

import { loadBoard } from '../../store/actions/board'
import { getLoadingBoard, getAmIEdit, getTitle, getPendingRequests } from '../../store/selectors'
import Header from '../../containers/Header/Header'
import Menu from './components/Menu/Menu';
import Lists from './components/Lists/Lists';
import Info from './components/Info/Info'

const Board = ({ loading, amIEdit, title, loadBoard, pendingRequests }) => {
    const { id } = useParams()
    const [showInfo, setShowInfo] = useState(true)

    useEffect(() => {
        loadBoard(id)
    }, [id, loadBoard])

    useEffect(() => {
        function confirmExit() {
            return pendingRequests > 0 ? "Saving element": null;
        }
        window.onbeforeunload = confirmExit;
        return () =>  window.onbeforeunload = null
    }, [pendingRequests])


    return (
        <main className={styles.board}>
            <Header title={title} />
            {showInfo && !amIEdit && !loading ?
                <Info text="This board is public, so that you can't edit this :(" onClose={() => setShowInfo(false)} />
                : null}
            <Menu />
            <Lists />
        </main>
    )
}

const mapStateToProps = (state) => ({
    loading: getLoadingBoard(state),
    amIEdit: getAmIEdit(state),
    title: getTitle(state),
    pendingRequests: getPendingRequests(state)
})

export default connect(mapStateToProps, { loadBoard })(Board)