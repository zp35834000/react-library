import Mock from 'mockjs'

// 权限相关mock数据
import {} from './mockData/menu'
import {} from './mockData/icon'
import {} from './mockData/role'
import {} from './mockData/roleMenuRel'
import {} from './mockData/User'
import {} from './mockData/UserRole'

// 书籍相关mock数据
import {} from './mockData/book/book'
import {} from './mockData/book/bookType'
import {} from './mockData/book/detailBook'

Mock.mock( '/user', function(options){
    console.log(options);
    let data = Mock.mock({
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
  
    return data;
})


Mock.mock( '/test', function(options){
    console.log(options);
    let data = Mock.mock({
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
    return data;
})
