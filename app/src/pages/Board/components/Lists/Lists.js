import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

import { createList } from '../../../../services/ListServices'
import List from '../List/List'
import AddButton from '../../../../components/AddButton/AddButton'
import ListNew from '../CardNew/CardNew'

const Lists = ({ boardId, lists, isLoading, onChangeList, context, editable }) => {
    const [isAddingList, setIsAddingList] = useState(false)
    const [_lists, _setLists] = useState(lists)

    useEffect(()=>{
        _setLists(lists)
    },[lists])

    const saveListHandler = (text) => {
        if (text) {
            const list = {
                title: text,
                boardId: boardId,
            }
            createList(list)
                .then(data => {
                    _setLists(lists => [...lists, { id: data.id, title: data.title, cards: [], boardId: data.boardId, order: data.order }])
                })
        }
        setIsAddingList(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.lists}>
                {_lists.map(list => (
                    <List key={`list-${list.id}`} context={context} {...list} editable={editable}/>
                ))}
                {isLoading ?
                    <>
                        <List isLoading />
                        <List isLoading />
                    </>
                    : !isAddingList && editable ? <AddButton title="Add another list" onClick={() => setIsAddingList(true)} /> : null
                }
                {isAddingList && editable ?
                    <ListNew onBlur={saveListHandler} onSave={saveListHandler} placeholder="Enter a title for this list..." />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Lists