import Mock from 'mockjs'

import {guid} from '../../util'
import {getUserKeyAndName} from '../User'
import {getBookByKey} from './book'

/**
 * 书籍详情
 * key:                 每本书籍的独立标识
 * borrowed:            是否已借出(0:未借出, 1: 借出, 2:借阅审批中, 3:归还审批中)
 * bookKey:             所属书籍(对应bookType中key)
 * borrowUserKey:       借阅用户key
 * borrowTime:          借出时间
 * shouldReturnTime:    应归还时间
 */
export let detailBooks = [
    {key: '0', borrowed: 1, bookKey: '0', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11'},
    {key: '1', borrowed: 0, bookKey: '0', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: ''},
    {key: '2', borrowed: 0, bookKey: '0', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: ''},
    {key: '3', borrowed: 0, bookKey: '0', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: ''},
    {key: '4', borrowed: 1, bookKey: '1', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11'},
    {key: '5', borrowed: 1, bookKey: '1', borrowUserKey: 'wyyykey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11'},
    {key: '6', borrowed: 1, bookKey: '1', borrowUserKey: 'wyyykey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11'},
    {key: '7', borrowed: 1, bookKey: '1', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11'},
    {key: '8', borrowed: 0, bookKey: '1', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: ''},
    {key: '9', borrowed: 0, bookKey: '1', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: ''}
]

/** detailBooks中借出状态和描述对应关系*/
export const borrowedKeyAndValue = {
    0: '未借出',
    1: '已借出',
    2: '借阅审批中',
    3: '归还审批中',
}

export const getBorrowedKeyAndValue = Mock.mock('/detailBookController/getBorrowedKeyAndValue', function(options){
    return borrowedKeyAndValue;
})

export const getBookByBookKey = Mock.mock('/detailBookController/getBookByBookKey', function(options){
    const bookKey = JSON.parse(options.body).bookKey;
    const UserKeyAndName = getUserKeyAndName();
    const detailBookResult = [];
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.bookKey === bookKey){
            const temp = Object.assign({}, detailBook, {
                borrowUserKey: UserKeyAndName[detailBook.borrowUserKey]
            })
            detailBookResult.push(temp);
        }
    }
    return detailBookResult;
})


export const addDetailBook = Mock.mock('/detailBookController/addDetailBook', function(options){
    const bookKey = JSON.parse(options.body).bookKey;
    const key = guid();
    const detailBookNeedAdd = {
        key,
        borrowed: 0,  
        borrowUserKey: '', 
        borrowTime: '', 
        shouldReturnTime: '',
        bookKey,
    }
    detailBooks.push(detailBookNeedAdd);
})


export const delDetailBookAction = Mock.mock('/detailBookController/delDetailBook', function(options){
    const key = JSON.parse(options.body).key;
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === key){
            detailBooks.splice(i, 1);
            break;
        }
    }
})


export const getDetailByUserKeyAction = Mock.mock('/detailBookController/getDetailByUserKey', function(options){
    const userKey = JSON.parse(options.body).userKey;
    const borrowBooks = [];
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.borrowUserKey === userKey){
            // 书籍描述信息，图书详情在book.js中的对应记录信息
            const bookDesc = getBookByKey(detailBook.bookKey);
            let borrowBook = Object.assign({}, bookDesc, {
                key: detailBook.key,
                borrowTime: detailBook.borrowTime,
                shouldReturnTime: detailBook.shouldReturnTime,
                borrowed: detailBook.borrowed
            })
            borrowBooks.push(borrowBook);
        }
    }
    return borrowBooks;
})

export const setDetailReturnReviewAction = Mock.mock('/detailBookController/setDetailReturnReview', function(options){
    const key = JSON.parse(options.body).key;
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === key){
            detailBook.borrowed = 3;
            break;
        }
    }
})