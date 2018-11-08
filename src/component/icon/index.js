import React from 'react'

import './iconfont/iconfont.css'
class Icon extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const type = this.props.type;
        const className = "anticon-library anticon-"+type;
        const style = this.props.style;
        return(
            <li 
                className={className}
                style = {style}>
            </li>
        )
    }
}

export default Icon