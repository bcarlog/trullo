import * as ActionTypes from '../actionTypes'
import { updateObject } from '../../utils/Reducers'
import { orderCards, deleteCardFromList, addCardToList, orderLists } from '../../utils/Sorting'

const initializeState = {
    id: null,
    lists: [],
    amIOwner: false,
    editable: false,
    title: '',
    visibility: '',
    team: [],
    teamFull: [],
    ownerFull: null,
    loadingBoard: true,
    pendingRequests: 0
}

const boardReducer = (state = initializeState, action) => {
    switch (action.type) {
        case ActionTypes.PUT_BOARD: return updateBoard(state, action)
        case ActionTypes.CHANGE_BOARD: return changeBorad(state, action)
        case ActionTypes.LOADING_BOARD: return updateObject(state, { loadingBoard: action.payload.loading })
        case ActionTypes.ADD_LIST: return addList(state, action)
        case ActionTypes.CHANGE_CARD_ORDER: return changeCardOrder(state, action)
        case ActionTypes.CHANGE_CARD_LIST: return changeCardList(state, action)
        case ActionTypes.CHANGE_LIST_ORDER: return changeListOrder(state, action)
        case ActionTypes.ADD_CARD: return addCard(state, action)
        case ActionTypes.CHANGE_PENDING_REQUESTS: return updateObject(state, { pendingRequests: state.pendingRequests + action.payload.number })
        default: return state
    }
}

const updateBoard = (state, action) => {
    const { id, title, visibility, team, teamFull, ownerFull, amIOwner, amIEdit, lists } = action.payload
    const orderedLists = lists.sort((l1, l2) => l1.order - l2.order)
    return updateObject(state, { id, title, visibility, team, teamFull, ownerFull, amIOwner, amIEdit, editable: amIEdit, lists: orderedLists, loadingBoard: false })
}

const changeBorad = (state, action) => {
    const { visibility, title, description } = action.payload
    return updateObject(state, { visibility: visibility ?? state.visibility, title: title ?? state.title, description: description ?? state.description })
}

const addList = (state, action) => {
    const { list } = action.payload
    list.cards = []
    return updateObject(state, { lists: [...state.lists, list] })
}

const changeCardOrder = (state, action) => {
    const { cardId, listId, order } = action.payload
    const newList = state.lists.find(list => list.id === listId)
    newList.cards = orderCards({ cards: newList.cards, cardId, order })
    const newLists = state.lists.map(list => list.id === list ? newList : list)
    return updateObject(state, { lists: newLists })
}

const changeCardList = (state, action) => {
    const { cardId, oldListId, newListId, order } = action.payload

    const oldList = { ...state.lists.find(list => list.id === oldListId) }
    const card = { ...oldList.cards.find(card => card.id === cardId) }
    const sourceList = deleteCardFromList({ list: oldList, cardId })

    const newList = { ...state.lists.find(list => list.id === newListId) }
    const destinationList = addCardToList({ list: newList, card, order })

    const newLists = state.lists.map(list => list.id === oldListId ? sourceList : list.id === newListId ? destinationList : list)
    return updateObject(state, { lists: newLists })
}

const changeListOrder = (state, action) => {
    const { listId, order } = action.payload
    const newLists = orderLists({ lists: state.lists, listId, order })
    return updateObject(state, { lists: newLists })
}

const addCard = (state, action) => {
    const { card } = action.payload
    const oldList = { ...state.lists.find(list => list.id === card.listId) }
    oldList.cards = [...oldList.cards, card]

    const newLists = state.lists.map(list => list.id === card.listId ? oldList : list)
    return updateObject(state, { lists: newLists })
}

export default boardReducer