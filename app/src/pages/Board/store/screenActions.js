export const DRAG_CARD = "DRAG_CARD"
export const DROP_CARD = "DROP_CARD"

export const dragCard = ({cardDrag, height}) => {
    return { type: DRAG_CARD, cardDrag, height }
}

export const dropCard = () => {
    return { type: DROP_CARD }
}