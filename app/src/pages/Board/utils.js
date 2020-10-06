import { changeCardOrderServer, changeCardListServer, changeListOrderServer } from '../../store/actions/board'

export const manageDragDrop = (e, dispatch) => {
    const { draggableId, source, destination, type } = e
    const oldListId = source.droppableId
    const oldOrder = source.index + 1
    const newListId = destination?.droppableId
    const newOrder = destination?.index + 1

    if (!checkNewPosition({ newListId, oldListId, newOrder, oldOrder })) {
        return
    }

    if (type === 'list') {
        const listId = draggableId
        dispatch(changeListOrderServer({ listId, order: newOrder }))
        return
    }

    const cardId = draggableId
    if (oldListId === newListId) {
        dispatch(changeCardOrderServer({ cardId, listId: oldListId, order: newOrder }))
    } else {
        dispatch(changeCardListServer({ cardId, oldListId, newListId, order: newOrder }))
    }
}

const checkNewPosition = ({ newListId, oldListId, newOrder, oldOrder }) => {
    return newListId && (newListId !== oldListId || newOrder !== oldOrder)
}