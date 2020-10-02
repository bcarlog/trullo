export const orderList = ({ list, id, order }) => {
    const { order: oldOrder } = list.find(item => item.id === id)

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

export const orderListFromOrder = ({ list, order }) => {
    let res = list.map(item => {
        if (item.order > order) {
            item.order = item.order - 1
        }
        return item
    })
    return res
}