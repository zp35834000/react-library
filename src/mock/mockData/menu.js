import Mock from 'mockjs'

import {guid} from '../util'
import {getRoleByUserKey} from './UserRole'
import {getRoleMenuByRoleId} from './roleMenuRel'

// 数据源
let allMenus = [
    // 权限管理
    {name: '权限管理', url: '', iconType: 'yingyongguanli', level: '0', order:'0', key: '0'},
    {name: '权限菜单', url: '/menu', iconType: 'yingyongguanli', level: '1', order:'0', key: '00', parentId: '0'},
    {name: '角色', url: '/role', iconType: '', level: '1', order:'1', key: '01', parentId: '0'},
    {name: '用户', url: '/user', iconType: 'yingyongguanli', level: '1', order:'2', key: '02', parentId: '0'},
    // 图书管理
    {name: '图书管理', url: '', iconType: '', level: '0', order:'1', key: '1'},
    {name: '图书分类', url: '/bookType', iconType: '', level: '1', order:'0', key: '10', parentId: '1'},
    {name: '图书详情', url: '/book', iconType: '', level: '1', order:'1', key: '11', parentId: '1'},
    // 借阅管理
    {name: '借阅管理', url: '', iconType: '', level: '0', order:'2', key: '2'},
    {name: '借阅图书', url: '/borrowManage/borrow', iconType: '', level: '1', order:'0', key: '20', parentId: '2'},
]



// 深度复制源数据
function copyAllMenus(){
    let allMenuTemp = [];
    for (let i = 0; i < allMenus.length; i++) {
        let tempMenu = Object.assign({}, allMenus[i]);
        allMenuTemp[i] = tempMenu;
    }
    return allMenuTemp;
}

/**
 * 获得指定id菜单的所有子级直属目录
 * @param {指定id} id 
 * @param {目录全集，默认为所有menu，如果查询的是用户权限，则为用户带有父级目录的权限集合} completeMenus 
 */
function getDirectChildMenu(id, completeMenus){
    let directChildenMenu = [];
    let allMenusCopy;
    if(completeMenus !== undefined){
        allMenusCopy = completeMenus;
    }else{
        allMenusCopy = copyAllMenus();
    }
    for (let i = 0; i < allMenusCopy.length; i++) {
        let singleMenu = allMenusCopy[i];
        if(singleMenu.parentId == id){
            directChildenMenu.push(singleMenu);
        }
    }
    return directChildenMenu;
}

// 递归获得一个菜单的所有子集目录
function getMenuWithChildren(singleMenu, completeMenus){
    let id = singleMenu.key;
    let directChildenMenu = getDirectChildMenu(id, completeMenus);
    if(directChildenMenu.length != 0){
        singleMenu.children = directChildenMenu;
        singleMenu.children.map(menu =>{
            getMenuWithChildren(menu, completeMenus);
        })
        
    }
        
    return singleMenu;
}

// 获得menu展示需要的数据个数，带有children属性
function getAllMenuWithChildren(allMenusCopy = copyAllMenus()){

    let topMenus = allMenusCopy.filter(function(item){
        return (item.parentId == undefined);
    });

    let menuWithChildren = topMenus.map(
        menu => {
            return getMenuWithChildren(menu, allMenusCopy);
        }
    )
    return menuWithChildren;
}

/**通过用户key获得该用户的所有权限menu对象 */
function getMenuByUserKey(userKey){
    let menuKeysTemp = [];
    let menuObjArr = [];
    const roleKeys = getRoleByUserKey(userKey);
    for (let i = 0; i < roleKeys.length; i++) {
        const roleKey = roleKeys[i];
        const menuKeys = getRoleMenuByRoleId(roleKey);
        for (let j = 0; j < menuKeys.length; j++) {
            const roleMenu = menuKeys[j];
            if(menuKeysTemp.indexOf(roleMenu.menuId) === -1){
                menuKeysTemp.push(roleMenu.menuId);
            }
        }
    }

    for (let i = 0; i < menuKeysTemp.length; i++) {
        const menuKey = menuKeysTemp[i];
        for (let j = 0; j < allMenus.length; j++) {
            const menuObj = allMenus[j];
            if(menuObj.key === menuKey){
                menuObjArr.push(Object.assign({}, menuObj));
                break;
            }
        }
    }

    return menuObjArr;
}

/**获得渲染需要的menu集合，如果用户不具备父级权限的所有子集权限，那么用户即
 * 不具备该父级权限，然而前台的渲染需要该父级权限，此方法主要补充渲染需要的
 * 用户不具备的父级权限
 */
function getRenderNeededMenu(userMenuArr){
    let renderNeededMenu = [];
    let renderNeededMenuKeys = [];
    for (let i = 0; i < userMenuArr.length; i++) {
        const userMenu = userMenuArr[i];
        const menuArrWithParents = getAllParentMenu(userMenu, []);
        for (let j = 0; j < menuArrWithParents.length; j++) {
            const menutemp = menuArrWithParents[j];
            if(renderNeededMenuKeys.indexOf(menutemp.key) === -1){
                renderNeededMenuKeys.push(menutemp.key);
                renderNeededMenu.push(menutemp);
            }
        }
    }

    return renderNeededMenu;
}

/**根据menukey获得该menu及其所有父级menu的集合 */
function getAllParentMenu(menuObj, menuObjArr){
    menuObjArr.push(menuObj);
    if(menuObj.parentId !== undefined){
        let parentMenu;
        for (let i = 0; i < allMenus.length; i++) {
            parentMenu = Object.assign({}, allMenus[i]);
            if(parentMenu.key === menuObj.parentId){
                menuObjArr.push(parentMenu);
                break;
            }
        }
        if(parentMenu.parentId !== undefined){
            return getAllParentMenu(parentMenu, menuObjArr)
        }else{
            return menuObjArr;
        }
    }else{
        return menuObjArr;
    }
}




/**通过userkey获得menu集合，并将结果组合成展示需要的带有children的数据类型 */
function getMenuWithChildrenByUserKey(userKey){
    const userMenus = getMenuByUserKey(userKey);
    const renderNeededMenu = getRenderNeededMenu(userMenus);
    const menuWithChildren = getAllMenuWithChildren(renderNeededMenu);

    return menuWithChildren;
}

// 根据menu实体获得该menu的所有父级menu key集合
function getParentKeyAction(parentKeyArr, selectMenuKeys){
    if(selectMenuKeys.parentId == undefined){
        return parentKeyArr;
    }else{
        let parentMenu;
        for (let i = 0; i < allMenus.length; i++) {
            const singleMenu = allMenus[i];
            if(singleMenu.key == selectMenuKeys.parentId){
                parentKeyArr.push(singleMenu.key);
                parentMenu = singleMenu;
                break;
            }
        }

        return getParentKeyAction(parentKeyArr, parentMenu);
    }
}


// 根据menu key获得该menu对象
function getMenuByKeyAction(menuKey){
    for (let i = 0; i < allMenus.length; i++) {
        const singleMenu = allMenus[i];
        if(singleMenu.key == menuKey){
            return singleMenu;
        }
    }
}


// 获得所有menu方法
export var getMenu =  Mock.mock( '/menuController/getMenu', function(options){
    let menuWithChildren = getAllMenuWithChildren();
    return menuWithChildren;
})

export var getSimpleMenu = Mock.mock('/menuController/getSimpleMenu', function(options){
    return allMenus;
})

// 添加menu操作
export var addMenu = Mock.mock('/menuController/addMenu', function(options){
    let optionObj = JSON.parse(options.body);
    let key = "cms"+guid();
    optionObj.values.key = key;
    allMenus.push(optionObj.values);
})

// 删除menu操作
export var delMenu = Mock.mock('/menuController/delMenu', function(options){
    let optionObj = JSON.parse(options.body);
    let delKeys = optionObj.keys;
    for (let i = 0; i < delKeys.length; i++) {
        const delKey = delKeys[i];
        for (let j = 0; j < allMenus.length; j++) {
            const menu = allMenus[j];
            if(menu.key == delKey){
                allMenus.splice(j, 1);
                break;
            }
        }
    }
})

// 编辑menu操作
export var editMenu = Mock.mock('/menuController/editMenu', function(options){
    let optionObj = JSON.parse(options.body);
    let values = optionObj.values;
    // 删除children属性
    delete options['children'];
    for (let i = 0; i < allMenus.length; i++) {
        let menu = allMenus[i];
        if(menu.key == values.key){
            allMenus.splice(i, 1, values);
            break;
        }
    }
})



export var getParentMenuKey = Mock.mock('/menuController/getParentMenuKey', function(options){
    // const optionObj = JSON.parse(options.body);
    // const selectKey = optionObj.params.selectMenuKeys;
    const selectKey = options.body.split('=')[1];
    
    const selectMenu = getMenuByKeyAction(selectKey);
    let parentKeyArr = getParentKeyAction([], selectMenu)
    return parentKeyArr;
})

// 获得所有有子集menu的menu key值集合
export var getMenuHasChidrenAction = Mock.mock('/menuController/getMenuHasChidrenAction', function(options){
    let menuHasChidren = [];
    for (let i = 0; i < allMenus.length; i++) {
        const menu = allMenus[i];
        if(menu.parentId != undefined && menuHasChidren.indexOf(menu.parentId) == -1){
            menuHasChidren.push(menu.parentId);
        }
    }

    return menuHasChidren;
})


export var getMenuWithChildrenByUserKeyAction = Mock.mock('/menuController/getMenuByUserKey', function(options){
    const userKey = JSON.parse(options.body).userKey;
    return getMenuWithChildrenByUserKey(userKey);
})
