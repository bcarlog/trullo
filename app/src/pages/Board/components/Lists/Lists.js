import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import styles from './styles.module.scss'

import { addListServer } from '../../../../store/actions/board'
import { getLoadingBoard, getLists, getEditable } from '../../../../store/selectors'
import { manageDragDrop } from '../../utils'
import { useDispatch } from 'react-redux'
import AddButton from '../../../../components/AddButton/AddButton'
import ListSkeleton from '../List/ListSkeleton'
import ListSaving from '../List/ListSaving'
import ListNew from '../CardNew/CardNew'
import List from '../List/List'

const Lists = ({ loading, lists, editable, addListServer }) => {
    const [isAddingList, setIsAddingList] = useState(false)
    const [newListTitle, setNewListTitle] = useState(null)
    const dispatch = useDispatch()

    const saveListHandler = (text) => {
        if (text) {
            setNewListTitle(text)
            addListServer(text, ()=>setNewListTitle(null))
        }
        setIsAddingList(false)
    }

    const onDragEnd = (e) => {
        manageDragDrop(e, dispatch)
    }

    const listOrdered = lists.sort((l1, l2) => l1.order - l2.order)

    return (
        <div className={styles.container}>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId="all-columns" direction="horizontal" type="list" isDropDisabled={newListTitle !== null}>
                    {(provided) => (
                        <div className={styles.lists} {...provided.droppableProps} ref={provided.innerRef}>
                            {listOrdered.map((list, index) => (
                                <List
                                    key={`list-${list.id}-${list.cards.length}`}
                                    id={list.id}
                                    isDragDisabled={newListTitle !== null}
                                    index={index}
                                    title={list.title}
                                    boardId={list.boardId}
                                    editable={editable}
                                />
                            ))}
                            {provided.placeholder}
                            {newListTitle ? <ListSaving title={newListTitle} /> : null}
                            {loading ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </>
                                : !isAddingList && editable ? <AddButton title="Add another list" onClick={() => setIsAddingList(true)} /> : null
                            }
                            {isAddingList && editable ?
                                <div style={{width:240}}>
                                    <ListNew onBlur={saveListHandler} onSave={saveListHandler} placeholder="Enter a title for this list..." />
                                </div>
                                :
                                null
                            }
                        </div>

                    )}


                </Droppable>
            </DragDropContext>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: getLoadingBoard(state),
    lists: getLists(state),
    editable: getEditable(state),
})

export default connect(mapStateToProps, { addListServer })(Lists)