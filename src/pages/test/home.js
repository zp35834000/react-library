import React from 'react'
import {connect} from 'react-redux'
import {login} from '../../redux/actions/common'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this)
    }

    login() {
        this.props.history.push('/story');
        this.props.changeUserName();
    }

    render(){
        return (
            <div>
                <h1>home page</h1>
                <a onClick={this.login}>login</a>
            </div>
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
        }
    }
}

Home = connect(
    null,
    mapDispatchToProps
)(Home)

export default Home;