

import {Form, Input, DatePicker, Select} from 'antd'
import React from 'react'
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;

// 编辑书本

class EditBook extends React.Component{

    componentWillMount(){
        this.props.onRef(this);
    }

    // 提交表单
    handleSubmit = (e) => {
        let submitted = false;
        if(e != undefined){

            e.preventDefault();
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                submitted = values;
                if(this.props.defaultEditRecord !== undefined
                    && this.props.defaultEditRecord.key !== undefined){
                    submitted.key = this.props.defaultEditRecord.key;
                }
                
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

        const editRole = this.props.defaultEditRecord;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                >
                    {getFieldDecorator('name', {
                        rules: [
                            {required: true, message: '请输入书籍名称!'}
                        ],
                        initialValue: editRole.name
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="作者"
                >
                    {getFieldDecorator('author', {
                        rules: [
                            {required: true, message: '请输入作者姓名!'}
                        ],
                        initialValue: editRole.author
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出版社"
                >
                    {getFieldDecorator('publishingHouse', {
                        rules: [
                            {required: true, message: '请输入角色名称!'}
                        ],
                        initialValue: editRole.publishingHouse
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出版时间"
                >
                    {getFieldDecorator('publicshingTime', {
                        rules: [
                            {required: true, message: '请输入角色名称!'}
                        ],
                        // initialValue: editRole.publicshingTime
                        initialValue: moment('2015/01', 'YYYY-MM')  
                    })(
                        <MonthPicker  format='YYYY-MM' locale = {locale}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="图书类型"
                >
                    {getFieldDecorator('type', {
                        rules: [
                            {required: true, message: '请输入角色名称!'}
                        ],
                        initialValue: editRole.type
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}


const WrappedEditBookForm = Form.create()(EditBook);

export default WrappedEditBookForm;