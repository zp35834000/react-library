import axios from 'axios'

import{MENU_KEY, USER_LOGIN, REQUEST_POSTS, RECEIVE_POSTS} from './type'


export function login(userKey) {
    return {
        type: USER_LOGIN,
        userKey
    }
}

/**设定当前选中menu action */
export function menuSet(menuKey) {
    return {
        type: MENU_KEY,
        menuKey
    }
}

/**发送登录request action */
function requestLoginPosts(){
    return {
        type: REQUEST_POSTS
    }
}

/**接受登录response action */
function receiveLoginPosts(userKey){
    return {
        type: RECEIVE_POSTS,
        userKey
    }
}

/**完整登录action */
export function checkLogin(userName, password) {
    return (dispatch) => {
        dispatch(requestLoginPosts());
        return axios.post('/userController/checkLogin', {
            userName,
            password
        }).then(function(response){
            if(response.data.success){
                dispatch(receiveLoginPosts(response.data.userKey));
            }else{
                dispatch(receiveLoginPosts(''))
            }
        })
    }
}