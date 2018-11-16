import{MENU_KEY} from './type'

export function login(userName) {
    return {
        type: 'USER_LOGIN',
        userName
    }
}

export function menuSet(menuKey) {
    return {
        type: MENU_KEY,
        menuKey
    }
}