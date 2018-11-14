import Mock from 'mockjs'

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
        name: '角色',
        url: '/role',
        iconType: 'yingyongguanli',
        level: '0',
        order:'1',
        key: '1',
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
    },
    {
        name: '用户',
        url: '/user',
        iconType: 'yingyongguanli',
        level: '2',
        order:'2',
        key: '020',
        parentId: '02'
    }
]

// 获得制定id菜单的所有直系子集菜单
function getDirectChildMenu(id){
    let directChildenMenu = [];
    for (let i = 0; i < allMenus.length; i++) {
        let singleMenu = allMenus[i];
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
    let topMenus = allMenus.filter(function(item){
        return (item.parentId == undefined);
    });

    let menuWithChildren = topMenus.map(
        menu => {
            return getMenuWithChildren(menu);
        }
    )
    return menuWithChildren;
}

// 获得所有menu方法
export var getMenu =  Mock.mock( '/menuController/getMenu', function(options){
    let menuWithChildren = getAllMenuWithChildren();
    return menuWithChildren;
})

export var getSimpleMenu = Mock.mock('/menuController/getSimpleMenu', function(options){

})