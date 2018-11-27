import { Form, Input, Cascader, AutoComplete,Select } from 'antd'
import React from 'react'
import axios from 'axios'

import {addressArr} from '../../mock/mockData/User'
const FormItem = Form.Item;
const Option = Select.Option;





class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    // 所有角色数组
    roleOptions: []
  };

  componentDidMount(){
      this.props.onRef(this);
      this.initRoleOptionData();
  }

  handleSubmit = (e) => {
    let submitUser = false;

    if(e != undefined){

        e.preventDefault();
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        submitUser = values;
      }
    });
    return submitUser;
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码必须一致!');
    } else {
      callback();
    }
  }

  // 初始化角色选择下拉框
  initRoleOptionData = () => {
    const _this = this;
    axios.post('/roleController/getAllRoles',{
    }).then(function (response) {
        _this.setState({roleOptions: response.data});
    }).catch(function (error) {
        console.log(error);
    });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    let defaultPhone = this.props.defaultEditRecord.phone;
    if(defaultPhone === undefined){
      defaultPhone = '86-'
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: defaultPhone.split('-')[0],
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );


    return (
      <Form onSubmit={this.handleSubmit}>
        

        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名!',
            }],
            initialValue: this.props.defaultEditRecord.username,
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入真实姓名!',
            }],
            initialValue: this.props.defaultEditRecord.name,
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex', {
            rules: [{
              required: true, message: '请选择性别!',
            }],
            initialValue: this.props.defaultEditRecord.sex,
          })(
            <Select >
              <Option value="0">女</Option>
              <Option value="1">男</Option>
            </Select>
          )}
        </FormItem>

        

        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
            initialValue: this.props.defaultEditRecord.password
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
            initialValue: this.props.defaultEditRecord.password
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="地址"
        >
          {getFieldDecorator('address', {
            initialValue: this.props.defaultEditRecord.addressValue,
            rules: [{ type: 'array', required: true, message: '请选择地址!' }],
          })(
            <Cascader options={addressArr} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入电话号码!' }],
            initialValue: defaultPhone.split('-')[1]
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="角色"
        >
          {getFieldDecorator('roleName', {
            rules: [{ required: true, message: '请选择用户角色!' }],
            initialValue: this.props.defaultEditRecord.roleArr
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择角色"
            >
              {this.state.roleOptions.map(function(role){
                return <Option key={role.key}>{role.name}</Option>
              })}
            </Select>

          )}
        </FormItem>

      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
