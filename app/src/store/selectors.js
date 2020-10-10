export const getBoardState = (store) => store.board

export const getLoadingBoard = (store) => getBoardState(store).loadingBoard

export const getAmIEdit = (store) => getBoardState(store).amIEdit

export const getTitle = (store) => getBoardState(store).title

export const getVisibility = (store) => getBoardState(store).visibility

export const getTeam = (store) => getBoardState(store).team

export const getTeamFull = (store) => getBoardState(store).teamFull

export const getOwner = (store) => getBoardState(store).ownerFull

export const getBoardId = (store) => getBoardState(store).id

export const getAmIOwner = (store) => getBoardState(store).amIOwner

export const getEditable = (store) => getBoardState(store).editable

export const getLists = (store) => getBoardState(store).lists

export const getList = (store, listId) => getBoardState(store).lists.find(list => list.id === listId)

export const getCardsFromList = (store, listId) => getList(store, listId).cards

export const getPendingRequests = (store) => getBoardState(store).pendingRequests

export const getConfigState = (store) => store.config