import {Form, Input} from 'antd'
import React from 'react'


const FormItem = Form.Item;

class EditBookType extends React.Component {


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
                            {required: true, message: '请输入角色名称!'}
                        ],
                        initialValue: editRole.name
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const WrappedEditBookTypeForm = Form.create()(EditBookType);

export default WrappedEditBookTypeForm;