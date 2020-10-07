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