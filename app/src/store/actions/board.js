import * as ActionTypes from '../actionTypes'

import * as BoardServices from '../../services/BoardServices'
import * as ListServices from '../../services/ListServices'
import * as CardServices from '../../services/CardServices'

export const changePendingRequests = (number) => ({
    type: ActionTypes.CHANGE_PENDING_REQUESTS,
    payload: { number }
})

export const setLoadingBoard = (loading) => ({
    type: ActionTypes.LOADING_BOARD,
    payload: {
        loading
    }
})

export const putBoard = (board) => ({
    type: ActionTypes.PUT_BOARD,
    payload: board
})

export const loadBoard = (id) => {
    return dispatch => {
        dispatch(setLoadingBoard(true))
        BoardServices.getBoardById(id)
            .then(board => dispatch(putBoard(board)))
        //.catch(err => window.open("/", "_self"))
    }
}

export const changeBoard = ({ visibility, title, description }) => ({
    type: ActionTypes.CHANGE_BOARD,
    payload: { visibility, title, description }
})

export const updateBoard = (data) => {
    return (dispatch, getState) => {
        const { id, team } = getState().board
        if (data.newUserId) {
            data.team = [...team, data.newUserId]
            delete data.newUserId
            BoardServices.updateBoard(id, data).then(board => dispatch(putBoard(board)))
        } else {
            BoardServices.updateBoard(id, data)
            dispatch(changeBoard(data))
        }
    }
}

export const addList = (list) => ({
    type: ActionTypes.ADD_LIST,
    payload: {
        list
    }
})

export const addListServer = (listTitle, cb) => {
    return (dispatch, getState) => {
        const list = {
            title: listTitle,
            boardId: getState().board.id,
        }
        dispatch(changePendingRequests(+1))
        ListServices.createList(list)
            .then(list => {dispatch(addList(list)); cb();})
            .finally(() => dispatch(changePendingRequests(-1)))
    }
}

export const changeCardOrder = ({ cardId, listId, order }) => ({
    type: ActionTypes.CHANGE_CARD_ORDER,
    payload: { cardId, listId, order }
})

export const changeCardOrderServer = ({ cardId, listId, order }) => {
    return (dispatch) => {
        dispatch(changePendingRequests(+1))
        CardServices.updateCardList({ cardId, listId, order })
            .finally(()=>dispatch(changePendingRequests(-1)))
        dispatch(changeCardOrder({ cardId, listId, order }))
    }
}

export const changeCardList = ({ cardId, oldListId, newListId, order }) => ({
    type: ActionTypes.CHANGE_CARD_LIST,
    payload: { cardId, oldListId, newListId, order }
})

export const changeCardListServer = ({ cardId, oldListId, newListId, order }) => {
    return (dispatch) => {
        dispatch(changePendingRequests(+1))
        CardServices.updateCardList({ cardId, listId: newListId, order })
            .finally(()=>dispatch(changePendingRequests(-1)))
        dispatch(changeCardList({ cardId, oldListId, newListId, order }))
    }
}

export const changeListOrder = ({ listId, order }) => ({
    type: ActionTypes.CHANGE_LIST_ORDER,
    payload: { listId, order }
})

export const changeListOrderServer = ({ listId, order }) => {
    return (dispatch) => {
        dispatch(changePendingRequests(+1))
        ListServices.updateListOrder({ listId, order })
            .finally(()=>dispatch(changePendingRequests(-1)))
        dispatch(changeListOrder({ listId, order }))
    }
}

export const addCard = ({card}) => ({
    type: ActionTypes.ADD_CARD,
    payload: {card}  
})

export const addCardServer = ({title, boardId, listId, cb}) => {
    return (dispatch) => {
        const card = {
            title: title,
            boardId,
            listId
        }
        dispatch(changePendingRequests(+1))
        CardServices.createCard(card)
            .then(card => dispatch(addCard({card})))
            .finally(()=>{dispatch(changePendingRequests(-1)); cb()})
    }
}