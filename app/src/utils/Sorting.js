export const orderCards = ({ cards, cardId, order }) => {
    const { order: oldOrder } = cards.find(card => card.id === cardId)
    cards = cards.map(card => {
        if (order < oldOrder && card.order >= order && card.order <= oldOrder) {
            card.order = card.order + 1
        } else if (order > oldOrder && card.order <= order && card.order >= oldOrder) {
            card.order = card.order - 1
        }
        if (card.id === cardId) {
            card.order = order
        }
        return card
    })

    return cards
}

export const orderLists = ({ lists, listId, order }) => {
    const { order: oldOrder } = lists.find(list => list.id === listId)
    lists = lists.map(list => {
        if (order < oldOrder && list.order >= order && list.order <= oldOrder) {
            list.order = list.order + 1
        } else if (order > oldOrder && list.order <= order && list.order >= oldOrder) {
            list.order = list.order - 1
        }
        if (list.id === listId) {
            list.order = order
        }
        return list
    })

    return lists
}

export const deleteCardFromList = ({ list, cardId }) => {
    const { order } = list.cards.find(card => card.id === cardId)
    list.cards = [...list.cards.filter(card => card.id !== cardId)]
    list.cards.map(card => {
        if (card.order > order) {
            card.order = card.order - 1
        }
        return card
    })
    return list
}

export const addCardToList = ({list, card, order}) => {
    card.order = order
    card.listId = list.id
    list.cards.map(card => {
        if(card.order >= order){
            card.order = card.order + 1
        }
        return card
    })
    list.cards = [...list.cards, card]
    return list
}