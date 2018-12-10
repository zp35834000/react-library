import Mock from 'mockjs'
import {guid} from '../../util'
import {detailBooks} from './detailBook'
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
    publicshingTime: '2012-10', type: 'literature'},
    
    {key: '1', name: '二十四史', author: '无',publishingHouse: '商务印书馆',
    publicshingTime: '2012-10',  type: 'literature'}
    
]


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
                if(detailBook.borrowed === 1){
                    bookOverview.borrowed += 1;
                }else{
                    bookOverview.circulated += 1;
                }
                break;
            }
        }
    }

    return bookOverviews;
}


export const getBookAction = Mock.mock('/bookController/getBook', function(options){
    return getAllBooks();
})