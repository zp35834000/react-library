import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'

// 权限管理
import Menu from '../pages/authority/menu'
import Role from '../pages/authority/role'
import User from '../pages/authority/User'


// 图书管理
import Book from '../pages/bookManage/Book'
import BookType from '../pages/bookManage/BookType'


// 图书借阅
import BookBoorrow from '../pages/borrowManage/Borrow'

// 登录界面
import Login from '../pages/login/Login'

const route = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Login}></Route>
            <Route path='/menu' component={Menu}></Route>
            <Route path='/role' component={Role}></Route>
            <Route path='/user' component={User}></Route>

            <Route path='/book' component={Book}></Route>
            <Route path='/bookType' component={BookType}></Route>

            <Route path='/borrowManage/borrow' component={BookBoorrow}></Route>
        </div>
    </BrowserRouter>
)

export default route;