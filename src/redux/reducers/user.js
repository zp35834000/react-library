function loginName(state = '', action) {
    switch(action.type) {
        case 'USER_LOGIN' :
            return action.userName
        default:
            return ''
    }
}

export default loginName;