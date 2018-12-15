// 角色和菜单对应关系mock数据
import Mock from 'mockjs'

import {guid} from '../util'

export let allRoleMenu = [
    {roleId: '0', menuId: '0', key: '0'},
    {roleId: '0', menuId: '00', key: '1'},
    {roleId: '0', menuId: '01', key: '2'},
    {roleId: '0', menuId: '02', key: '3'},
    {roleId: '0', menuId: '1', key: '6'},
    {roleId: '0', menuId: '10', key: '7'},
    {roleId: '0', menuId: '11', key: '8'},
    {roleId: '1', menuId: '00', key: '4'},
    {roleId: '1', menuId: '01', key: '5'},
    {roleId: '2', menuId: '2', key: '9'},
    {roleId: '2', menuId: '20', key: '10'},
    {roleId: '3', menuId: '3', key: '11'},
    {roleId: '3', menuId: '30', key: '12'},
]

/**
 * 根据角色id获得角色的所有权限
 * @param {角色id} roleId 
 */
export function getRoleMenuByRoleId(roleId){
    let optRoleMenu = [];
    for (let i = 0; i < allRoleMenu.length; i++) {
        const element = allRoleMenu[i];
        if(element.roleId === roleId){
            optRoleMenu.push(element);
        }
    }
    return optRoleMenu;
}


export var getAllRoleMenu = Mock.mock('/roleMenuController/getAllRoleMenu', function(options){
    let optionObj = JSON.parse(options.body);
    let roleId = optionObj.roleId;
    let menuArr = [];
    for (let i = 0; i < allRoleMenu.length; i++) {
        const roleMenu = allRoleMenu[i];
        if(roleMenu.roleId == roleId){
            menuArr.push(roleMenu.menuId);
        }

    }

    return menuArr;
})

// 删除权限操作
export var delRoleMenu = Mock.mock('/roleMenuController/delRoleMenu', function(options){
    const optionObj = JSON.parse(options.body);
    const delKeys = optionObj.delKeys;
    const roleKey = optionObj.roleKey;


    for (let i = 0; i < delKeys.length; i++) {
        const delKey = delKeys[i];
        for (let j = 0; j < allRoleMenu.length; j++) {
            const roleMenu = allRoleMenu[j];
            if(delKey === roleMenu.menuId && roleKey === roleMenu.roleId){
                allRoleMenu.splice(j, 1);
                break;
            }
        }
    }
})


// 增加权限操作
export var addRoleMenu = Mock.mock('/roleMenuController/addRoleMenu', function(options){
    const optionObj = JSON.parse(options.body);
    const addKeys = optionObj.addKeys;
    const roleKey = optionObj.roleKey;

    for (let i = 0; i < addKeys.length; i++) {
        const uuit = guid();
        const addKey = addKeys[i];
        // {roleId: '1', menuId: '01', key: '5'}
        const addRoleMenu = {
            roleId: roleKey, 
            menuId: addKey, 
            key: uuit
        }
        allRoleMenu.push(addRoleMenu);
    }
})