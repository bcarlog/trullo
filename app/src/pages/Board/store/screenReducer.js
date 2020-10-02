import { DRAG_CARD } from './screenActions'
import { DROP_CARD } from './screenActions'

const initializeState = {
    cardDrag: null,
    height: 0,
}

const itemReducer = (state = initializeState, action) => {
    switch (action.type) {
        case DRAG_CARD:
            const { cardDrag, height } = action
            return { ...state, cardDrag, height }
        case DROP_CARD:
            return { ...state, cardDrag: null, height: 0 }
        default:
            return state
    }
}

export default itemReducer