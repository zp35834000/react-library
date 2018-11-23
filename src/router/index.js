import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'


import Home from '../pages/test/home'
import AntTest from '../pages/antTest'
import Menu from '../pages/authority/menu'
import Role from '../pages/authority/role'
import User from '../pages/authority/User'

const route = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/antTest' component={AntTest}></Route>
            <Route path='/menu' component={Menu}></Route>
            <Route path='/role' component={Role}></Route>
            <Route path='/user' component={User}></Route>
        </div>
    </BrowserRouter>
)

export default route;