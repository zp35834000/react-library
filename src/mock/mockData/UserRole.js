// 用户角色对应关系

import Mock from 'mockjs'

import {guid} from '../util/index'
export let allUserRole = [
    {userKey: '0', roleKey: '0', key: '0'},
    {userKey: '0', roleKey: '1', key: '1'},
    {userKey: '1', roleKey: '1', key: '2'}
]

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

/** 添加用户角色对应关系 */
export var addUserRoleAction = Mock.mock('/userRoleController/addUserRole', function(options){

})