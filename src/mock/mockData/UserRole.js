// 用户角色对应关系

import Mock from 'mockjs'

import {guid} from '../util/index'
export let allUserRole = [
    {userKey: 'zpkey', roleKey: '0', key: '0'},
    {userKey: 'zpkey', roleKey: '1', key: '1'},
    {userKey: 'wyyykey', roleKey: '1', key: '2'}
]

/**通过用户key获得roleKey集合 */
export var getRoleByUserKey = (userKey) => {
    let roleKeys = [];
    for (let i = 0; i < allUserRole.length; i++) {
        const userRole = allUserRole[i];
        if(userRole.userKey === userKey){
            roleKeys.push(userRole.roleKey);
        }
    }
    return roleKeys;
}

/**添加用户角色 */
export function addUserRole(userKey, roleKeyArr){
    for (let i = 0; i < roleKeyArr.length; i++) {
        const roleKey = roleKeyArr[i];
        const uid = guid();
        let userRole = {userKey, roleKey};
        userRole.key = uid;
        allUserRole.push(userRole);
    }
}

/**删除用户角色 */
export function delUserRoleByUserKey(userKey) {
    for (let i = 0; i < allUserRole.length; i++) {
        const userRole = allUserRole[i];
        if(userRole.userKey === userKey){
            allUserRole.splice(i ,1);
        }
    }
}

/**删除用户指定角色 */
export var delUserRoleByUserKeyRoleKey = (userKey, roleKeyArr) =>{
    for (let i = 0; i < roleKeyArr.length; i++) {
        const deleRoleKey = roleKeyArr[i];
        for (let j = 0; j < allUserRole.length; j++) {
            const userRole = allUserRole[j];
            if(userRole.userKey === userKey 
                && userRole.roleKey === deleRoleKey){
                allUserRole.splice(j ,1);
                break;
            }
        }
    }
}

/** 添加用户角色对应关系 */
export var addUserRoleAction = Mock.mock('/userRoleController/addUserRole', function(options){

})