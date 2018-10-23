import React from 'react'
import {connect} from 'react-redux'

class Story extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log(this.props.name)
    }

    render(){
        return (
            <div>
                <h1>story page</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.loginName
    }
}

Story  = connect(
    mapStateToProps
)(Story)
export default Story;