export const orderList = ({ list, id, order }) => {
    const { order: oldOrder } = (list.filter(i => i.id === id))[0]

    return list.map(item => {
        if (order < oldOrder && item.order >= order && item.order <= oldOrder) {
            item.order = item.order + 1
        } else if (order > oldOrder && item.order <= order && item.order >= oldOrder) {
            item.order = item.order - 1
        }
        if (item.id === id) {
            item.order = order
        }
        return item
    })
}

export const orderListWithNewCard = ({ list, id, order }) => {
    return list.map(item => {
        if (item.order >= order) {
            item.order = item.order + 1
        }
        if (item.id === id) {
            item.order = order
        }
        return item
    })
}

export const orderCardsWithCardEliminated = ({cards, order}) => {
    return cards.map(card => {
        if(card.order > order){
            card.order = card.order - 1
        }
        return card
    })
}