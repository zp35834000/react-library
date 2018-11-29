import {combineReducers} from 'redux'

import {MENU_KEY, REQUEST_POSTS, RECEIVE_POSTS} from '../actions/type'


function menuKey(state = '01', action) {
    switch(action.type) {
        case MENU_KEY :
            return action.menuKey
        default:
            return state
    }
}

function loginUserKey(
    state={
        isFetching: false,
        didInvalidate: false,
        userKey: 'zpkey'
    }, action){

    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state,{
                isFetching: true,
                didInvalidate: false
            })
        
        case RECEIVE_POSTS:
            return Object.assign({} ,state,{
                isFetching: false,
                didInvalidate: false,
                userKey: action.userKey
            })

        default:
            return state;
    }
}

const reducer = combineReducers({
    loginUserKey,
    menuKey
})

export default reducer;