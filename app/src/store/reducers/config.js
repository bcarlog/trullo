import { CHANGE_THEME } from '../actionTypes'

const initializeState = {
    theme: localStorage.getItem('theme') || 'light'
}

const messageReducer = (state = initializeState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            let theme = state.theme
            if(theme === 'light'){
                theme = 'night'
            }else{
                theme = 'light'
            }
            localStorage.setItem('theme', theme)
            return { ...state, theme}
        default:
            return state
    }
}

export default messageReducer