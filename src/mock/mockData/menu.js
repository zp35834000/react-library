import Mock from 'mockjs'

const menus = [
    {
        name: '权限管理',
        url: '',
        iconType: 'yingyongguanli',
        level: '0',
        order:'0',
        key: '0',
        children:[
            {
                name: '权限菜单',
                url: '/menu',
                iconType: 'yingyongguanli',
                level: '1',
                order:'0',
                key: '00',
            },
            {
                name: '角色',
                url: '/role',
                iconType: '',
                level: '1',
                order:'1',
                key: '01',
            },
            {
                name: '用户',
                url: '/user',
                iconType: 'yingyongguanli',
                level: '1',
                order:'2',
                key: '02',
                children:[
                    {
                        name: '用户',
                        url: '/user',
                        iconType: 'yingyongguanli',
                        level: '2',
                        order:'2',
                        key: '020',
                    }
                ]
            },
        ]

    },
    {
        name: '角色',
        url: '/role',
        iconType: 'yingyongguanli',
        level: '0',
        order:'1',
        key: '1',
    },
]

export default Mock.mock( '/getMenu', function(options){
    console.log(menus);
    return menus;
})
