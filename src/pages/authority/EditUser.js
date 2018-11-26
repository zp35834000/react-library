import { Form, Input, Cascader, AutoComplete,Select } from 'antd'
import React from 'react'
import axios from 'axios'
import { runInThisContext } from 'vm';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'beijing',
  label: '北京',
  children: [{
    value: 'beijingshi',
    label: '北京市',
    children: [{
      value: 'haidian',
      label: '海淀',
    },{
      value: 'chaoyang',
      label: '朝阳',
    }],
  }],
}, {
  value: 'hubeisheng',
  label: '湖北',
  children: [{
    value: 'wuhanshi',
    label: '武汉市',
    children: [{
      value: 'hankou',
      label: '汉口',
    },{
      value: 'wuchang',
      label: '武昌',
    }],
  }],
}];

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
    if(e != undefined){

        e.preventDefault();
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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

  testFunction = () => {
      console.log('innerRegist');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

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
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
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
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="地址"
        >
          {getFieldDecorator('address', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          })(
            <Cascader options={residences} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
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
            initialValue: ['0', '1']
          })(
            <Select
              multiple
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
