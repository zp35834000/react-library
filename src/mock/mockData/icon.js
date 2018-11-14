import Mock from 'mockjs'

const iconTypes = [
    'yingyongguanli',
    'yibiaopan'
]

// 获得所有icon Type
export default Mock.mock('/iconController/getAllTypes', function(options){
    return iconTypes;
})