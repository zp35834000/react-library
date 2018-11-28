import {USER_LOGIN} from '../actions/type'

function loginUserKey(state = '', action) {
    switch(action.type) {
        case USER_LOGIN :
            return action.userKey
        default:
            return ''
    }
}

export default loginUserKey;