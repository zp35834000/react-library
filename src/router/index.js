import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'

import Home from '../pages/test/home'
import Story from '../pages/test/story'


const route = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/story' component={Story}></Route>
        </div>
    </BrowserRouter>
)

export default route;