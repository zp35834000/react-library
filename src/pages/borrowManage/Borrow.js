import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal, Tooltip} from 'antd'
import {connect} from 'react-redux'

import {menuSet} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'

class Borrow extends React.Component{

    state = {
        menuKey: '20'
    }

    render(){
        return (
            <MainPage
                history = {this.props.history}
                reduxMenuKey = {this.state.menuKey}
            >
                借阅图书页面
            </MainPage>
        )
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        dispatch
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Borrow);