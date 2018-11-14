import { Form, Input, Select} from 'antd'
import React from 'react'
import axios from 'axios'

import CustomIcon from '../../component/icon'
const FormItem = Form.Item;


class EditMenuForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            iconTypes: []
        }
        this.getAllIconTypes = this.getAllIconTypes.bind(this);
        this.getIconSelect = this.getIconSelect.bind(this);
    }

    // 获得icon选择下拉框
    getIconSelect(){
        const _this = this;
        let iconSelect = (
            <Select>
                {_this.state.iconTypes.map(
                    (iconType) => (
                        <Select.Option value={iconType} key={iconType}>
                            <CustomIcon type= {iconType}></CustomIcon>
                        </Select.Option>
                    )
                )}
            </Select>
        )
        return iconSelect;
    }

    componentDidMount(){
        this.props.onRef(this);
        this.getAllIconTypes();
    }


    // 获得所有icon type
    getAllIconTypes(){
        const _this = this;
        axios.post('/iconController/getAllTypes',{
            params: {
            }
        }).then(function (response) {
            _this.setState({iconTypes: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }



    // 提交表单
    handleSubmit = (e) => {
        let submitted = false;
        if(e != undefined){

            e.preventDefault();
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                debugger;
                submitted = true;
            }
        });
        return submitted;
    }




    render() {
        const _this = this;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24},
                sm: { span: 8},
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

        return (
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [ {
                            required: true, message: '请输出权限菜单名称!',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('url', {
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='图标'
                    >
                        {getFieldDecorator('iconType', {

                        })(
                            <Select allowClear={true}>
                                {_this.state.iconTypes.map(
                                    (iconType) => (
                                        <Select.Option value={iconType} key={iconType}>
                                            <CustomIcon type= {iconType}></CustomIcon>
                                        </Select.Option>
                                    )
                                )}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="菜单级别"
                        >
                        {getFieldDecorator('level', {
                            rules: [ {
                                required: true, message: '请输出权限菜单级别!',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="菜单顺序"
                    >
                        {getFieldDecorator('order', {
                            rules: [{ required: true, message: '请输入菜单顺序!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="父节点"
                    >
                        {getFieldDecorator('parentId', {
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            );
        }
    }

    const WrappedEditMenuForm = Form.create()(EditMenuForm);

    export default WrappedEditMenuForm;
