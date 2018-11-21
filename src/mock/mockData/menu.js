import Mock from 'mockjs'

import {guid} from '../util'

// 数据源
let allMenus = [
    {
        name: '权限管理',
        url: '',
        iconType: 'yingyongguanli',
        level: '0',
        order:'0',
        key: '0',

    },
    {
        name: '权限菜单',
        url: '/menu',
        iconType: 'yingyongguanli',
        level: '1',
        order:'0',
        key: '00',
        parentId: '0'
    },
    {
        name: '角色',
        url: '/role',
        iconType: '',
        level: '1',
        order:'1',
        key: '01',
        parentId: '0'
    },
    {
        name: '用户',
        url: '/user',
        iconType: 'yingyongguanli',
        level: '1',
        order:'2',
        key: '02',
        parentId: '0',
    }
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

// 获得制定id菜单的所有直系子集菜单
function getDirectChildMenu(id){
    let directChildenMenu = [];
    let allMenusCopy = copyAllMenus();
    for (let i = 0; i < allMenusCopy.length; i++) {
        let singleMenu = allMenusCopy[i];
        if(singleMenu.parentId == id){
            directChildenMenu.push(singleMenu);
        }
    }
    return directChildenMenu;
}

// 递归获得一个菜单的所有子集目录
function getMenuWithChildren(singleMenu){
    let id = singleMenu.key;
    let directChildenMenu = getDirectChildMenu(id);
    if(directChildenMenu.length != 0){
        singleMenu.children = directChildenMenu;
        singleMenu.children.map(menu =>{
            getMenuWithChildren(menu);
        })
        
    }
        
    return singleMenu;
}

// 获得menu展示需要的数据个数，带有children属性
function getAllMenuWithChildren(){
    let allMenusCopy = copyAllMenus();

    let topMenus = allMenusCopy.filter(function(item){
        return (item.parentId == undefined);
    });

    let menuWithChildren = topMenus.map(
        menu => {
            return getMenuWithChildren(menu);
        }
    )
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
