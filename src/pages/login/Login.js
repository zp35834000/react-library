import React from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'
import {CanvasParticle} from './canvas-particle'
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {

    componentWillMount(){
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

  render() {
    return (
        <div class="page">
            <div class="loginwarrp">
                <div class="logo">图书管理系统</div>
                <div class="login_form">
                    <form id="Login" name="Login" method="post" onsubmit="" action="">
                        <li class="login-item">
                            <span>用户名：</span>
                            <input type="text" id="username" name="UserName" class="login_input" />
                                                <span id="count-msg" class="error"></span>
                        </li>
                        <li class="login-item">
                            <span>密　码：</span>
                            <input type="password" id="password" name="password" class="login_input" />
                                                <span id="password-msg" class="error"></span>
                        </li>
                        <li class="login-sub">
                            <input type="submit" name="Submit" value="登录" />
                                                <input type="reset" name="Reset" value="重置" />
                        </li>                      
                </form>
                </div>
            </div>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);



export default WrappedNormalLoginForm;