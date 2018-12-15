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
 * borrowCount:         累计借阅此时
 */
export let detailBooks = [
    {key: '0', borrowed: 1, bookKey: '0', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        borrowCount: 4},
    {key: '1', borrowed: 0, bookKey: '0', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: '',
        borrowCount: 2},
    {key: '2', borrowed: 0, bookKey: '0', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: '',
        borrowCount: 1},
    {key: '3', borrowed: 0, bookKey: '0', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: '',
        borrowCount: 6},
    {key: '4', borrowed: 2, bookKey: '0', borrowUserKey: 'zpkey', 
        borrowTime: '', shouldReturnTime: '',
        borrowCount: 10},
    {key: '5', borrowed: 1, bookKey: '1', borrowUserKey: 'wyyykey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        borrowCount: 11},
    {key: '6', borrowed: 3, bookKey: '1', borrowUserKey: 'wyyykey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        borrowCount: 12},
    {key: '7', borrowed: 3, bookKey: '1', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        borrowCount: 19},
    {key: '8', borrowed: 0, bookKey: '1', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: '',
        borrowCount: 9},
    {key: '9', borrowed: 0, bookKey: '1', borrowUserKey: '', 
        borrowTime: '', shouldReturnTime: '',
        borrowCount: 1}
]

/** detailBooks中借出状态和描述对应关系*/
export const borrowedKeyAndValue = {
    0: '未借出',
    1: '已借出',
    2: '借阅审批中',
    3: '归还审批中',
}

/**
 * 更新detailbook
 * @param {需要更新的detailbook key} key 
 * @param {需要更新的值及变更结果} updateObj 
 */
export const updateDetail = (key, updateObj) => {
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === key){
            for (const detailKey in updateObj) {
                if (updateObj.hasOwnProperty(detailKey)) {
                    if(detailKey === 'borrowCount'){
                        // 如果有更新值borrowCount,则借阅次数+1
                        detailBook.borrowCount ++;
                    }else{
                        detailBook[detailKey] = updateObj[detailKey];
                    }
                }
            }
            break;
        }
    }
}

export const getBorrowedKeyAndValue = Mock.mock('/detailBookController/getBorrowedKeyAndValue', function(options){
    return borrowedKeyAndValue;
})

/**通过图书详情id获得该图书的详细信息 */
export const getbookDescByDetailBookKey = (detailBookKey) => {
    // 通过detailBookKey获得归属的bookkey
    let bookKey = '';
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === detailBookKey){
            bookKey = detailBook.bookKey;
            break;
        }
    }
    const bookDesc = getBookByKey(bookKey);
    return bookDesc;
}

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
        borrowCount: 0
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

/**将图书详情置为归还申请状态 */
export const setDetailReturnReview = (detailBookKey) => {
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === detailBookKey){
            detailBook.borrowed = 3;
            break;
        }
    }
}

/** 申请归还图书 */
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

/**根据用户key和申请借阅的bookKey获得借阅书籍详情key集合 */
export const applyBorrowBook = (borrowBookKeys, userKey) => {
    const detailBookKeys = [];
    for (let i = 0; i < borrowBookKeys.length; i++) {
        const borrowBookKey = borrowBookKeys[i];
        for (let j = 0; j < detailBooks.length; j++) {
            const detailBook = detailBooks[j];
            if(detailBook.borrowed === 0 && detailBook.bookKey === borrowBookKey){
                detailBook.borrowed = 2;
                detailBook.borrowUserKey = userKey;
                detailBookKeys.push(detailBook.key);
                break;
            }
        }
    }
    return detailBookKeys;
}

/**申请借阅书籍 */
export const applyBorrowBookAction = Mock.mock('/detailBookController/applyBorrowBookAction', function(options){
    const borrowBookKeys = JSON.parse(options.body).borrowBookKeys;
    const userKey = JSON.parse(options.body).userKey;
    applyBorrowBook(borrowBookKeys, userKey);
})

/** 将图书详情置为可借阅状态*/
export const recallBorrowApply = (detailBookKey)=> {
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === detailBookKey){
            detailBook.borrowed = 0;
            detailBook.borrowUserKey = '';
            break;
        }
    }
}

/**撤回借阅申请 */
export const recallApplyAction = Mock.mock('/detailBookController/recallApplyAction', function(options){
    const detailBookKey = JSON.parse(options.body).detailBookKey;
    recallBorrowApply(detailBookKey);
})


/**将图书置为借阅成功状态 */
export const setBorrowSuccess = (detailBookKey) => {
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        if(detailBook.key === detailBookKey){
            detailBook.borrowed = 1;
            console.log(detailBook);
            break;
        }
    }
}

/**撤回归还申请 */
export const recallReturnAction = Mock.mock('/detailBookController/recallReturnAction', function(options){
    const detailBookKey = JSON.parse(options.body).detailBookKey;
    setBorrowSuccess(detailBookKey);
})