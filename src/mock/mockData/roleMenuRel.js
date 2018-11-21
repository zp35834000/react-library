// 角色和菜单对应关系mock数据
import Mock from 'mockjs'

import {guid} from '../util'

let allRoleMenu = [
    {roleId: '0', menuId: '0', key: '0'},
    {roleId: '0', menuId: '00', key: '0'},
    {roleId: '0', menuId: '01', key: '0'},
    {roleId: '0', menuId: '02', key: '0'},
    {roleId: '1', menuId: '00', key: '1'},
    {roleId: '1', menuId: '01', key: '1'}
]


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

