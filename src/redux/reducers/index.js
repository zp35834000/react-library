import {combineReducers} from 'redux'

import {MENU_KEY} from '../actions/type'
import loginUserKey from './user'


function menuKey(state = '', action) {
    switch(action.type) {
        case MENU_KEY :
            return action.menuKey
        default:
            return '01'
    }
}

const reducer = combineReducers({
    loginUserKey,
    menuKey
})

export default reducer;