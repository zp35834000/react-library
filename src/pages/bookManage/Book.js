import React from 'react'
import axios from 'axios'

import MainPage from '../../component/mainPage'

class Book extends React.Component{

    state = {
        menuKey: '11'
    }

    render(){
        return (
            <MainPage 
                history={this.props.history}
                reduxMenuKey = {this.state.menuKey}
            >
                图书详情page
            </MainPage>
        )
    }
}

export default Book;