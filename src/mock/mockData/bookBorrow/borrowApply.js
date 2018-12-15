import Mock from 'mockjs'
import moment from 'moment';

import {guid} from '../../util'

import {applyBorrowBook, getbookDescByDetailBookKey, 
    setDetailReturnReview, recallBorrowApply, setBorrowSuccess} from '../book/detailBook'

/**归还借阅书籍时间的格式 */
export const BORROW_RETURN_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * key:                     唯一约束
 * borrowed:                借阅状态，具体意义看borrowedKeyAndValue
 * detailBook:              借阅图书detailBook Id
 * borrowUserKey:           借阅用户key
 * borrowTime:              成功借阅时间
 * shouldReturnTime:        应归还时间
 * returnTime:              实际归还时间
 * borrowAuditingUserKey:   借阅申请审批人key
 * applyTime:               申请时间(审批中申请才有申请时间)
 * returnAuditingUserKey:   归还申请审批人key
 * auditingMessage:         审批信息(主要针对驳回申请的情况)
 */
export let borrowApplies = [
    {key: '0', borrowed: 1, detailBook: '0', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        returnTime: '', borrowAuditingUserKey: 'zpKey', applyTime: '',
        returnAuditingUserKey: '', auditingMessage: '借阅成功',},

    {key: '1', borrowed: 2, detailBook: '4', borrowUserKey: 'zpkey', 
        borrowTime: '', shouldReturnTime: '',
        returnTime: '', borrowAuditingUserKey: '', applyTime: '2018-12-10',
        returnAuditingUserKey: '', auditingMessage: '借阅审核中',},

    {key: '2', borrowed: 1, detailBook: '5', borrowUserKey: 'wyyykey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        returnTime: '', borrowAuditingUserKey: 'zpKey', applyTime: '',
        returnAuditingUserKey: '', auditingMessage: '借阅成功',},

    {key: '3', borrowed: 3, detailBook: '6', borrowUserKey: 'wyyykey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        returnTime: '', borrowAuditingUserKey: 'zpKey', applyTime: '2019-12-12',
        returnAuditingUserKey: '', auditingMessage: '归还审核中',},

    {key: '4', borrowed: 4, detailBook: '7', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        returnTime: '', borrowAuditingUserKey: 'zpKey', applyTime: '2018-01-09',
        returnAuditingUserKey: 'zpKey', auditingMessage: '图书有损坏',},

    {key: '5', borrowed: 0, detailBook: '9', borrowUserKey: 'zpkey', 
        borrowTime: '2018-12-11', shouldReturnTime: '2019-01-11',
        returnTime: '2018-12-25', borrowAuditingUserKey: 'zpKey', applyTime: '',
        returnAuditingUserKey: 'zpkey', auditingMessage: '归还成功',},

]

/**借阅申请中borrowed实际值和描述对应关系 */
export const borrowedKeyAndValue = {
    0: '归还成功',
    1: '借阅成功',
    2: '借阅审批中',
    3: '归还审批中',
    4: '归还审核失败',
    5: '借阅审核失败'
}

/**申请借阅书籍 */
export const applyBorrowBookAction = Mock.mock('/borrowApplyController/applyBorrowBookAction',function(options){
    const borrowBookKeys = JSON.parse(options.body).borrowBookKeys;
    const userKey = JSON.parse(options.body).userKey;
    const key = guid();
    const borrowApply = {
        key,
        borrowed: 2,
        borrowUserKey: userKey,
        borrowTime: '', 
        shouldReturnTime: '',
        returnTime: '', 
        borrowAuditingUserKey: '',
        returnAuditingUserKey: '', 
        auditingMessage: '借阅申请中',
        applyTime: moment(new Date()).format(BORROW_RETURN_DATE_FORMAT)
    }
    // 修改detailBooks信息，并获得借阅的detailBook key值
    const detailBookKeys = applyBorrowBook(borrowBookKeys, userKey);
    for (let i = 0; i < detailBookKeys.length; i++) {
        const detailBookKey = detailBookKeys[i];
        const actualBorrowApply = Object.assign({detailBook: detailBookKey}, borrowApply);
        borrowApplies.push(actualBorrowApply);
    }
})

/**通过用户id获得借阅申请信息 */
export const getBorrowApplyByUserKeyAction = Mock.mock('/borrowApplyController/getBorrowApplyByUserKeyAction', function(options){
    const userKey = JSON.parse(options.body).userKey;
    const borrowApplyResult = [];
    for (let i = 0; i < borrowApplies.length; i++) {
        const borrowApply = borrowApplies[i];
        if(borrowApply.borrowUserKey === userKey){
            const bookDesc = getbookDescByDetailBookKey(borrowApply.detailBook);
            const borrowApplyTemp = Object.assign({}, bookDesc, {
                key: borrowApply.key,
                borrowed: borrowApply.borrowed,
                borrowTime: borrowApply.borrowTime,
                shouldReturnTime: borrowApply.shouldReturnTime,
                returnTime: borrowApply.returnTime,
                auditingMessage: borrowApply.auditingMessage,
                detailBook: borrowApply.detailBook,
                applyTime: borrowApply.applyTime
            })
            borrowApplyResult.push(borrowApplyTemp);
        }
    }
    return borrowApplyResult;
})

/**获得需要审核的申请 */
export const getBorrowAppliesNeedVerifiedAction = Mock.mock('/borrowApplyController/getBorrowAppliesNeedVerifiedAction', function(options){
    // debugger;
    const borrowApplyResult = [];
    for (let i = 0; i < borrowApplies.length; i++) {
        const borrowApply = borrowApplies[i];
        if(borrowApply.borrowed === 2 || borrowApply.borrowed === 3 ||
            borrowApply.borrowed === 4){
            const bookDesc = getbookDescByDetailBookKey(borrowApply.detailBook);
            const borrowApplyTemp = Object.assign({}, bookDesc, {
                key: borrowApply.key,
                borrowed: borrowApply.borrowed,
                borrowTime: borrowApply.borrowTime,
                shouldReturnTime: borrowApply.shouldReturnTime,
                returnTime: borrowApply.returnTime,
                auditingMessage: borrowApply.auditingMessage,
                detailBook: borrowApply.detailBook,
                applyTime: borrowApply.applyTime,
                borrowUserKey: borrowApply.borrowUserKey
            })
            borrowApplyResult.push(borrowApplyTemp);
        }
    }
    return borrowApplyResult;
})


export const getBorrowedKeyAndValueAction = Mock.mock('/borrowApplyController/getBorrowedKeyAndValueAction', function(options){
    return borrowedKeyAndValue;
})

/**提交归还申请 */
export const handleReturnApplyAction = Mock.mock('/borrowApplyController/handleReturnApplyAction', function(options){
    const detailBookKey = JSON.parse(options.body).detailBookKey;
    const key = JSON.parse(options.body).key;
    // 将图书详情置为归还申请状态
    setDetailReturnReview(detailBookKey);

    for (let i = 0; i < borrowApplies.length; i++) {
        const borrowApply = borrowApplies[i];
        if(borrowApply.key === key){
            borrowApply.borrowed = 3;
            borrowApply.returnTime = moment(Date.now()).format(BORROW_RETURN_DATE_FORMAT);
            borrowApply.auditingMessage = '归还审批中';
            borrowApply.applyTime = moment(new Date()).format(BORROW_RETURN_DATE_FORMAT)
            break;
        }
    }
})

/**撤回借阅申请 */
export const recallBorrowApplyAction = Mock.mock('/borrowApplyController/recallBorrowApplyAction', function(options){
    const detailBookKey = JSON.parse(options.body).detailBookKey;
    const key = JSON.parse(options.body).key;
    // 将图书详情置为可借阅状态
    recallBorrowApply(detailBookKey);

    // 用户自己撤回，可以直接删除申请记录
    for (let i = 0; i < borrowApplies.length; i++) {
        const borrowApply = borrowApplies[i];
        if(borrowApply.key === key){
            borrowApplies.splice(i, 1)
        }
    }
})


/**撤回归还申请 */
export const recallReturnApplyAction = Mock.mock('/borrowApplyController/recallReturnApplyAction', function(options){
    const detailBookKey = JSON.parse(options.body).detailBookKey;
    const key = JSON.parse(options.body).key;
    // 将图书详情置为借阅成功状态
    setBorrowSuccess(detailBookKey);

    // 撤回归还申请，改变状态，并删除归还时间
    for (let i = 0; i < borrowApplies.length; i++) {
        const borrowApply = borrowApplies[i];
        if(borrowApply.key === key){
            borrowApply.borrowed = 1;
            borrowApply.returnTime = '';
            borrowApply.auditingMessage = '借阅成功';
            borrowApply.applyTime = '';
        }
    }
})