import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'antd'

import './login.css'
import {CanvasParticle} from './canvas-particle'
import {checkLogin, receiveLoginPosts} from '../../redux/actions/common'


class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: 'zp',
            password: '123456',
            visible: false
        }
    }

    componentWillMount(){

        // 清除redux中登录信息
        this.props.dispatch(receiveLoginPosts(''));

        var config = {
            vx : 4,
            vy : 4,
            height : 2,
            width : 2,
            count : 100,
            color : "121, 162, 185",
            stroke : "100, 200, 180",
            dist : 6000,
            e_dist : 20000,
            max_conn : 10
        }
        CanvasParticle(config);
    }

    /**username 输入框改变事件 */
    usernameInputChange = (e)=>{
        this.setState({
            username: e.target.value
        })
    }

    /**password 输入框改变事件 */
    passwordInputChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    /**重置登录输入框 */
    resetInput = () => {
        this.setState({
            username: '',
            password: ''
        })
    }

    handleOk = () => {
        this.setState({visible: false})
    }

    submit = (e) => {
        e.preventDefault();
        this.props.dispatch(checkLogin(this.state.username, this.state.password)).then(
            () => {
                if(this.props.loginUserKey.userKey !== ''){

                    this.props.history.push('/role');
                }else{
                    this.setState({visible: true});
                }
            }
        );
    }

    render() {
        return (
            <div>
                <div className="page">
                    <div className="loginwarrp">
                        <div className="logo">图书管理系统</div>
                        <div className="login_form">
                            <form id="Login" name="Login" method="post" >
                                <li className="login-item">
                                    <span>用户名：</span>
                                    <input type="text" id="username" name="UserName" className="login_input" 
                                        value={this.state.username} onChange = { e=> this.usernameInputChange(e)}/>
                                    <span id="count-msg" className="error"></span>
                                </li>
                                <li className="login-item">
                                    <span>密　码：</span>
                                    <input type="password" id="password" name="password" className="login_input" 
                                        value={this.state.password} onChange = { e=> this.passwordInputChange(e)}/>
                                    <span id="password-msg" className="error"></span>
                                </li>
                                <li className="login-sub">
                                    <input type="submit" name="Submit" value="登录"  onClick={e => this.submit(e)}/>
                                    <input type="reset" name="Reset" value="重置"  onClick={e => this.resetInput()}/>
                                </li>                      
                            </form>
                        </div>
                    </div>
                </div>

                <Modal
                    title="提示"
                    visible={this.state.visible}
                    footer = {<Button type="primary" onClick={this.handleOk}>确定</Button>}
                    onCancel={this.handleOk}
                >
                    <p>账号密码错误</p>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps){
    return {
        loginUserKey: state.loginUserKey
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);