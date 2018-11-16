import {combineReducers} from 'redux'
import loginName from './user'


function menuKey(state = '', action) {
    switch(action.type) {
        case 'USER_LOGIN' :
            return action.menuKey
        default:
            return ''
    }
}

const reducer = combineReducers({
    loginName,
    menuKey
})

export default reducer;