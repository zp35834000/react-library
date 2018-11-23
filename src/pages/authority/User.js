import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


import {menuSet} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'

class User extends React.Component{
    state = {
        menuKey: '02',
    }


    componentWillMount(){
        this.props.dispatch(menuSet(this.state.menuKey));
    }


    render(){
        return (
            <MainPage   history={this.props.history}>
                userPage

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
)(User);