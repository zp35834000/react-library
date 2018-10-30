import React from 'react'
import {connect} from 'react-redux'

import {login} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this)
    }

    login() {
        this.props.history.push('/story');
        const { dispatch } = this.props
        dispatch(login('ownProps.name'));
        // this.props.changeUserName();
    }

    render(){
        return (
            <MainPage history={this.props.history}>
                <h1 class='homePage'>home page</h1>
                <a onClick={this.login}>login</a>
            </MainPage>
            
        )
    }
}

// Home.defaultProps = {
//     name: 'defaultName'
// }

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeUserName: () =>{
            // debugger;
            dispatch(login('ownProps.name'))
            // console.log('11111')
        },
        dispatch
    }
}

Home = connect(
    null,
    mapDispatchToProps
)(Home)

export default Home;