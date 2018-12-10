import React from 'react'
import {Table, Modal, Button, Icon} from 'antd'
import axios from 'axios'

import MainPage from '../../component/mainPage'
import EditBookType from './EditBookType'

class BookType extends React.Component{

    state = {
        menuKey: '10',
        data: [],
        selectedRowKeyArr: [],
        eidtRecord:{},
        editMenuVisible: false
    }

    componentWillMount(){
        this.loadData();
    }

    onRef = (ref) => {
        this.childForm = ref;
    }


    closeEditWindow = () =>{
        this.setState({editMenuVisible: false});
        // 重置所有输入框值
        this.childForm.props.form.resetFields();
    }

    submitForm = () => {
        const submittedFormData = this.childForm.handleSubmit();
        const _this  = this;
        if(submittedFormData !== false){
            // 提交表单
            if(this.state.eidtRecord.editType === 'add'){
                // 添加操作
                axios.post('/bookTypeController/addBookType',{
                    ...submittedFormData
                }).then(function (response) {
                    _this.loadData();
                }).catch(function (error) {
                    console.log(error);
                });
            }else if(this.state.eidtRecord.editType === 'edit'){
                // 编辑操作
                axios.post('/bookTypeController/editBookType',{
                    key : _this.state.eidtRecord.key,
                    name: submittedFormData.name
                }).then(function (response) {
                    _this.loadData();
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }

        // 关闭窗口
        this.closeEditWindow();
    }


    deleteSelectedRows = () => {
        const _this = this;
        const deleKeyArr = this.state.selectedRowKeyArr;
        //删除选中项
        axios.post('/bookTypeController/delBookType',{
            deleKeyArr
        }).then(function (response) {
            _this.loadData();
        }).catch(function (error) {
            console.log(error);
        });
    }


    editBookType = (record) => {
        const {
            name,
            key
        } = record;

        this.setState({
            eidtRecord: {
                name,
                key,
                editType: 'edit'
            }
        });

        this.setState({editMenuVisible: true});
    }

    openBlankEditWindow = () => {
        this.setState({editMenuVisible: true});
        this.setState({eidtRecord: {editType: 'add'}});
    }

    loadData = () =>{
        const _this = this;
        axios.post('/bookTypeController/getAllBookType',{

        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){

        const _this = this;
        const columns = [
            {title: '名称', dataIndex: 'name'},
            {title: '总数', dataIndex: 'total'},
            {title: '借出数', dataIndex: 'borrowed'},
            {title: '未借出数', dataIndex: 'circulated'},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{

                    return (
                        <div>
                            <a onClick={() =>_this.editBookType(record)}><Icon type="edit" /></a>
                        </div>
                    )
                } 
            }
        ]

        // 选中信息
        const rowSelection = {

            onChange: (selectedRowKeyArr, selectedRows) => {
                _this.setState({selectedRowKeyArr: selectedRowKeyArr})
                // selectedRowKeys = selectedRowKeyArr;
                // console.log(`selectedRowKeys: ${selectedRowKeyArr}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <MainPage 
                history={this.props.history}
                reduxMenuKey = {this.state.menuKey}
            >

                <Button type="primary" onClick={this.openBlankEditWindow}>
                    <Icon type="plus" />添加类型
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button type="primary" onClick={this.deleteSelectedRows}>
                    <Icon type="delete" />删除选中类型
                </Button>

                <Table
                    pagination = {false}
                    bordered = {true}
                    columns = {columns}
                    dataSource = {this.state.data}
                    rowSelection = {rowSelection}
                >
                </Table>

                <Modal
                    ref="modal"
                    visible={this.state.editMenuVisible}
                    title="添加类型" 
                    onOk={this.handleOk} 
                    onCancel={this.closeEditWindow}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.closeEditWindow}>返 回</Button>,
                        <Button key="submit" type="primary" size="large"  onClick={this.submitForm}>
                            提 交
                        </Button>
                    ]}
                    bodyStyle={{height:'200px'}}
                    width='700px'
                >
                    <EditBookType
                        onRef = {this.onRef}
                        defaultEditRecord = {this.state.eidtRecord}
                    >

                    </EditBookType>
                </Modal>
            </MainPage>
        )
    }
}

export default BookType;