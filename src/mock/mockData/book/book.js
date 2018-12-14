import Mock from 'mockjs'
import {guid} from '../../util'
import {detailBooks} from './detailBook'
import {getSimpleBook} from './bookType'
/**
 * 数据概览
 * key：                概览id
 * name：               书籍名称
 * author：             作者
 * publicshingHouse:    出版社
 * publicshingTime:     出版时间
 * type:                所属书籍类型(bookTypes中key值)
 */
let books = [
    {key: '0', name: '四书五经', author: '无',publishingHouse: '商务印书馆',
    publishingTime: '2012-10', type: 'literature'},
    
    {key: '1', name: '二十四史', author: '无',publishingHouse: '商务印书馆',
    publishingTime: '2012-10',  type: 'literature'}
    
]

/**通过key获得book详细信息 */
export const getBookByKey = (key) => {
    const bookTypeKeyAndName = getSimpleBook();
    let resultBookObj;
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        if(book.key === key){
            resultBookObj = Object.assign({}, book, {
                type: bookTypeKeyAndName[book.type]
            })
        }
    }
    return resultBookObj;
}

/**
 * 获得所有数据概览信息
 * key：                概览id
 * name：               书籍名称
 * author：             作者
 * publicshingHouse:    出版社
 * publicshingTime:     出版时间
 * type:                所属书籍类型(bookTypes中key值)
 * total:               总数            通过计算完整
 * borrowed:            借出数          通过计算完整
 * circulated:          未借出数        通过计算完整
 */
export const getAllBooks = () => {
    let detailBookCopy = [];
    // 深度复制book详情
    for (let i = 0; i < detailBooks.length; i++) {
        const detailBook = detailBooks[i];
        const detailBookCopyTemp = Object.assign({}, detailBook);
        detailBookCopy.push(detailBookCopyTemp);
    }
    
    // 深度复制book概览，并赋值total，borrowed，circulated
    let bookOverviews = [];
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        bookOverviews.push(Object.assign({
            total: 0,
            borrowed: 0,
            circulated: 0
        }, book))
    }

    for (let i = 0; i < detailBookCopy.length; i++) {
        const detailBook = detailBookCopy[i];
        for (let j = 0; j < bookOverviews.length; j++) {
            const bookOverview = bookOverviews[j];
            if(bookOverview.key === detailBook.bookKey){
                bookOverview.total += 1;
                if(detailBook.borrowed === 0){
                    // bookOverview.borrowed += 1;
                    bookOverview.circulated += 1;
                }else{
                    bookOverview.borrowed += 1;
                }
                break;
            }
        }
    }

    return bookOverviews;
}

/**获得可借阅书籍 */
export const getBooksCanBorrow = () => {
    // 结果集合
    let booksCanBorrow = [];

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        // 遍历详情，如果有可借阅书籍，则添加到结果集
        for (let j = 0; j < detailBooks.length; j++) {
            const detailBook = detailBooks[j];
            if(detailBook.bookKey === book.key){
                if(detailBook.borrowed === 0){
                    booksCanBorrow.push(book);
                    break;
                }
            }
        }
    }

    return booksCanBorrow;
}


export const getBooksCanBorrowAction = Mock.mock('/bookController/getBooksCanBorrowAction', function(options){
    return getBooksCanBorrow();
})

export const getBookAction = Mock.mock('/bookController/getBook', function(options){
    return getAllBooks();
})


export const addBookAction = Mock.mock('/bookController/addBook', function(options){
    const bookNeedAdd = JSON.parse(options.body);
    const key = guid();
    bookNeedAdd.key = key;
    books.push(bookNeedAdd);
})


export const editBookAction = Mock.mock('/bookController/editBook', function(options){
    const bookNeedEdit = JSON.parse(options.body);
    for (let i = 0; i < books.length; i++) {
        const currentBook = books[i];
        if(currentBook.key === bookNeedEdit.key){
            books.splice(i , 1, bookNeedEdit);
        }
    }
})


export const delBookAction = Mock.mock('/bookController/delBook', function(options){
    const delBook = JSON.parse(options.body);
    const delBookKeys = delBook.keys;
    const forbidDelBook = [];
    const bookWithCount = getAllBooks();
    for (let i = 0; i < delBookKeys.length; i++) {
        const delBookKey = delBookKeys[i];
        // 检查是否有借出书籍，如有借出书籍，不执行删除操作，并提示
        for (let j = 0; j < bookWithCount.length; j++) {
            const simpleBookWithCount = bookWithCount[j];
            if(simpleBookWithCount.key === delBookKey){
                if(simpleBookWithCount.borrowed === 0){
                    // 删除book
                    bookWithCount.splice(j , 1);
                    books.splice(j , 1);
                    // 删除detailBook
                    for (let k = 0; k < detailBooks.length; k++) {
                        const detailBook = detailBooks[k];
                        if(detailBook.bookKey === delBookKey){
                            detailBooks.splice(k , 1);
                        }
                    }
                }else{
                    forbidDelBook.push(simpleBookWithCount.name);
                }
                break;
            }
        }
    }

    return forbidDelBook;
})
