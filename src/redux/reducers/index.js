import {combineReducers} from 'redux'
import loginName from './user'


function menuKey(state = '', action) {
    switch(action.type) {
        case 'MENU_KEY' :
            return action.menuKey
        default:
            return '01'
    }
}

const reducer = combineReducers({
    loginName,
    menuKey
})

export default reducer;