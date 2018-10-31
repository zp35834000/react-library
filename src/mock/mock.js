import Mock from 'mockjs'

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