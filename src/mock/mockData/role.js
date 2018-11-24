/**
 * 角色mock数据
 */


import Mock from 'mockjs'

import {guid} from '../util'

export let allRoles = [
    {name: '管理员', key: '0'},
    {name: '普通用户', key: '1'}
]


// 获得所有角色信息
export var getAllRolesAction = Mock.mock('/roleController/getAllRoles', function(options){
    return allRoles;
})


// 添加角色信息
export var addRoleAction = Mock.mock('/roleController/addRole', function(options){
    let addedRole = JSON.parse(options.body).values;
    let key = "cms"+guid();
    addedRole.key = key;
    allRoles.push(addedRole);
})

// 添加角色信息
export var editRoleAction = Mock.mock('/roleController/editRole', function(options){
    debugger;
    let editedRole = JSON.parse(options.body).values;
    for (let i = 0; i < allRoles.length; i++) {
        const currentRole = allRoles[i];
        if(currentRole.key == editedRole.key){
            allRoles.splice(i, 1, editedRole)
        }
    }
    
})

export var delRoleAction = Mock.mock('/roleController/delRole', function(options){
    let optionObj = JSON.parse(options.body);
    let delKeys = optionObj.keys;
    for (let i = 0; i < delKeys.length; i++) {
        const delKey = delKeys[i];
        for (let j = 0; j < allRoles.length; j++) {
            const role = allRoles[j];
            if(role.key == delKey){
                allRoles.splice(j, 1);
                break;
            }
        }
    }
})
