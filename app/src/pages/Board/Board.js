import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import styles from './styles.module.scss'

import itemReducer from './store/screenReducer'
import Header from '../../containers/Header/Header'
import Menu from './components/Menu/Menu';
import Lists from './components/Lists/Lists';
import Info from './components/Info/Info'
import { getBoardById, updateBoard } from '../../services/BoardServices'

const Board = props => {
    const id = props.match.params.id
    const [amIOwner, setAmIOwner] = useState(false)
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState("")
    const [visibility, setVisibility] = useState("")
    const [team, setTeam] = useState([])
    const [teamFull, setTeamFull] = useState([])
    const [ownerFull, setOwnerFull] = useState()
    const [lists, setLists] = useState([])
    const [isLoadingLists, setIsLoadinglists] = useState(true)
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        getBoardById(id)
            .then(data => {
                updateInternBoard(data)
            })
            .catch((err) => {
                window.open("/", "_self")
            })
    }, [id])

    const updateInternBoard = board => {
        setTitle(board.title)
        setVisibility(board.visibility)
        setTeam(board.team)
        setTeamFull(board.teamFull)
        setOwnerFull(board.ownerFull)
        setAmIOwner(board.amIOwner)
        setEditable(board.amIEdit)
        setLists(board.lists.sort((l1, l2) => l1.order - l2.order))
        setIsLoadinglists(false)
        setShowInfo(!board.amIEdit)
    }

    const updateBoardHandler = (data) => {
        if (!isLoadingLists) {
            if (data.newUserId) {
                data.team = [...team, data.newUserId]
                delete data.newUserId
            }

            updateBoard(id, data)
                .then(data => {
                    console.log("Cambiando correctamente")
                    updateInternBoard(data)
                })
        }
    }

    const LocalContext = React.createContext();
    const store = createStore(itemReducer)

    return (
        <main className={styles.board}>
            <Header title={title} />
            {showInfo & !isLoadingLists? <Info text="This board is public, so that you can't edit this :(" onClose={()=>setShowInfo(false)}/> : null}

            <Menu
                onUpdateBoard={updateBoardHandler}
                team={teamFull}
                visibility={visibility}
                owner={ownerFull}
                amIOwner={amIOwner}
                editable={editable}
                boardId={id} />
            <Provider context={LocalContext} store={store}>
                <Lists
                    lists={lists}
                    onChangeList={setLists}
                    isLoading={isLoadingLists}
                    context={LocalContext}
                    boardId={id}
                    editable={editable} />
            </Provider>
        </main>
    )
}

export default Board