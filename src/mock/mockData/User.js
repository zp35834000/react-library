// 用户
import Mock from 'mockjs'
import {allUserRole} from './UserRole'
import {allRoles} from './role'
let allUser = [
    {username: 'zp', name: 'jerry', sex: '1', phone: '11213', address: '北京', password: '111111', key: '0'},
    {username: 'wyy', name: 'tom', sex: '0', phone: '11213', address: '武汉', password: '111111', key: '1'},
]


export var getAllUserAction = Mock.mock('/userController/getAllUser', function(options){
    let userRoles = [];
    let resultUser = [];
    for (let i = 0; i < allUserRole.length; i++) {
        const userRole = allUserRole[i];
        let userRoleWithName = Object.assign({roleName: ''}, userRole);
        for (let j = 0; j < allRoles.length; j++) {
            const role = allRoles[j];
            if(role.key === userRoleWithName.roleKey){
                userRoleWithName.roleName = role.name;
                break;
            }
        }
        userRoles.push(userRoleWithName)
    }

    for (let i = 0; i < allUser.length; i++) {
        const user = allUser[i];
        let userTemp = Object.assign({roleName: ''} , user);
        for (let j = 0; j < userRoles.length; j++) {
            const userRole = userRoles[j];
            if(userRole.userKey === userTemp.key){
                userTemp.roleName += userRole.roleName+','
            }
        }
        resultUser.push(userTemp);

    }
    return resultUser;
})