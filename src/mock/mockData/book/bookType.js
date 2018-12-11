import Mock from 'mockjs'
import {guid} from '../../util'
import {getAllBooks} from './book'

/**
 * 书籍种类
 * key：            主键
 * name：           种类名称
 */
export let bookTypes = [
    {key: 'literature', name: '文学'}
]

/**
 * 获得书籍种类概览信息
 * key：            主键
 * name：           种类名称
 * total：          该类书籍总数               通过计算完整
 * borrowed：       该类书籍已借出总数         通过计算完整
 * circulated：     该类书籍未借出总数         通过计算完整
 */
export const getBookTypesWithCount = () => {
    // 附带数据统计信息的书籍概览
    let booksWithCount = getAllBooks();
    let bookTypesWithCount = [];
    // 深度复制数据类型，并赋值total，borrowed，circulated
    for (let i = 0; i < bookTypes.length; i++) {
        const bookType = bookTypes[i];
        bookTypesWithCount.push(Object.assign({
            total: 0,
            borrowed: 0,
            circulated: 0
        }, bookType))
    }
    for (let i = 0; i < booksWithCount.length; i++) {
        const bookWithCount = booksWithCount[i];
        for (let j = 0; j < bookTypesWithCount.length; j++) {
            const bookTypeWithCount = bookTypesWithCount[j];
            if(bookWithCount.type === bookTypeWithCount.key){
                bookTypeWithCount.total += bookWithCount.total;
                bookTypeWithCount.borrowed += bookWithCount.borrowed;
                bookTypeWithCount.circulated += bookWithCount.circulated;
                break;
            }
        }
    }

    return bookTypesWithCount;
}

export const getBookTypesWithCountAction = Mock.mock('/bookTypeController/getAllBookType', function(options){
    return getBookTypesWithCount();
})


export const addBookTypeAction = Mock.mock('/bookTypeController/addBookType', function(options){
    const name = JSON.parse(options.body).name;
    const needAddBookType = {name};
    needAddBookType.key = guid();
    bookTypes.push(needAddBookType);
})


export const delBookType = Mock.mock('/bookTypeController/delBookType', function(options){
    const delBookTypeKeys = JSON.parse(options.body).deleKeyArr;
    for (let i = 0; i < delBookTypeKeys.length; i++) {
        const delBookTypeKey = delBookTypeKeys[i];
        for (let j = 0; j < bookTypes.length; j++) {
            const bookType = bookTypes[j];
            if(bookType.key === delBookTypeKey){
                bookTypes.splice(j ,1);
                break;
            }
        }
        
    }
})


export const editBookType = Mock.mock('/bookTypeController/editBookType', function(options){
    const bookTypeNeedEdit = JSON.parse(options.body);
    for (let i = 0; i < bookTypes.length; i++) {
        const bookType = bookTypes[i];
        if(bookType.key === bookTypeNeedEdit.key){
            bookTypes.splice(i ,1 ,bookTypeNeedEdit);
            break;
        }
    }
})


export const getSimpleBookAction = Mock.mock('/bookTypeController/getSimpleBook', function(options){
    const bookTypeMap = {};
    for (let i = 0; i < bookTypes.length; i++) {
        const bookType = bookTypes[i];
        bookTypeMap[bookType.key] = bookType.name;
    }
    return bookTypeMap;
})

export const getSimpleDataAction = Mock.mock('/bookTypeController/getSimpleData', function(options){
    return bookTypes;
})