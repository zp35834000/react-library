import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'

import Home from '../pages/test/home'
import Story from '../pages/test/story'
import Statistics from '../pages/statistics'
import AntTest from '../pages/antTest'
const route = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/story' component={Story}></Route>
            <Route path='/statistics' component={Statistics}></Route>
            <Route path='/antTest' component={AntTest}></Route>
        </div>
    </BrowserRouter>
)

export default route;