

import {Form, Input, DatePicker, Select} from 'antd'
import React from 'react'
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import axios from 'axios'

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;
const SelectOption = Select.Option

// 编辑书本

class EditBook extends React.Component{

    state = {
        bookTypeArr: []
    }

    componentWillMount(){
        this.props.onRef(this);
        this.getBookTypes();
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

    getBookTypes = () =>{
        const _this = this;
        axios.post('/bookTypeController/getSimpleData',{
        }).then(function (response) {
            _this.setState({bookTypeArr: response.data});
        }).catch(function (error) {
            console.log(error);
        });
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

        let defaultPublishTime = null;
        if(editRole.publishingTime !== undefined){
            defaultPublishTime = moment(editRole.publishingTime, 'YYYY-MM');
        }
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
                            {required: true, message: '请输入出版社名称!'}
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
                    {getFieldDecorator('publishingTime', {
                        rules: [
                            {required: true, message: '请选择图书出版时间!'}
                        ],
                        initialValue: defaultPublishTime
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
                            {required: true, message: '请选择图书类型!'}
                        ],
                        initialValue: editRole.type
                    })(
                        <Select>
                            {
                                _this.state.bookTypeArr.map(
                                    (bookType) => {
                                        return (
                                            <SelectOption value = {bookType.key} key={bookType.key}>
                                                {bookType.name}
                                            </SelectOption>
                                        )
                                    }
                                )
                            }
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}


const WrappedEditBookForm = Form.create()(EditBook);

export default WrappedEditBookForm;