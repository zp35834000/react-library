import{MENU_KEY, USER_LOGIN} from './type'


export function login(userKey) {
    return {
        type: USER_LOGIN,
        userKey
    }
}

export function menuSet(menuKey) {
    return {
        type: MENU_KEY,
        menuKey
    }
}


export function checkLogin() {
    
}