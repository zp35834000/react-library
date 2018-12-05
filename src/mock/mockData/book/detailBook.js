import Mock from 'mockjs'
import {guid} from '../../util'

/**
 * 书籍详情
 * key:         每本书籍的独立标识
 * borrowed:    是否已借出(1: 借出, 2:未借出)
 * bookKey:     所属书籍(对应bookType中key)
 */
export let detailBooks = [
    {key: '0', borrowed: 1, bookKey: '0', borrowUserKey: 'zpkey'},
    {key: '1', borrowed: 0, bookKey: '0', borrowUserKey: ''},
    {key: '2', borrowed: 0, bookKey: '0', borrowUserKey: ''},
    {key: '3', borrowed: 0, bookKey: '0', borrowUserKey: ''},
    {key: '4', borrowed: 1, bookKey: '1', borrowUserKey: 'zpkey'},
    {key: '5', borrowed: 1, bookKey: '1', borrowUserKey: 'wyyykey'},
    {key: '6', borrowed: 1, bookKey: '1', borrowUserKey: 'wyyykey'},
    {key: '7', borrowed: 1, bookKey: '1', borrowUserKey: 'zpkey'},
    {key: '8', borrowed: 0, bookKey: '1', borrowUserKey: ''},
    {key: '9', borrowed: 0, bookKey: '1', borrowUserKey: ''}
]