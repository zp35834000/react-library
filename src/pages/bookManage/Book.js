import React from 'react'
import {Table, Modal, Button, Icon} from 'antd'
import axios from 'axios'


import MainPage from '../../component/mainPage'
import EditBook from './EditBook'
import DetailBook from './DetailBook'
class Book extends React.Component{

    state = {
        menuKey: '11',
        data: [],
        bookTypeMap: {},
        eidtRecord: {},
        selectedRowKeyArr: [],
        editMenuVisible: false,
        viewDetailBookKey: '',
        detailBookVisible: false
    }

    componentWillMount(){
        this.loadData();
        this.loadBookTypeMap();
    }

    loadData = () => {
        const _this = this;
        axios.post('/bookController/getBook',{

        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    onRef = (ref) => {
        this.childForm = ref;
    }

    onDetailRef = (ref) => {
        this.childDetailBook = ref;
    }

    loadBookTypeMap = () => {
        const _this = this;
        axios.post('/bookTypeController/getSimpleBook',{

        }).then(function (response) {
            _this.setState({bookTypeMap: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**查看详细书籍信息 */
    viewDetailBook = (record) =>{
        debugger;
        this.setState({
            viewDetailBookKey: record.key,
            detailBookVisible: true
        });
        if(this.childDetailBook !== undefined){

            this.childDetailBook.loadData();
        }
    }

    /**关闭详细书籍信息 */
    closeDetailBookWindow = () => {
        this.setState({
            viewDetailBookKey: '',
            detailBookVisible: false
        });
    }

    openBlankEditWindow = () => {
        this.setState({editMenuVisible: true});
        this.setState({eidtRecord: {editType: 'add'}});
    }


    closeEditWindow = () =>{
        this.setState({editMenuVisible: false});
        // 重置所有输入框值
        this.childForm.props.form.resetFields();
    }

    /**删除选中图示 */
    deleteSelectedRows = () => {
        const _this = this;
        axios.post('/bookController/delBook',{
            keys : _this.state.selectedRowKeyArr,
        }).then(function (response) {
            console.log(response.data);
            _this.loadData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    /** 编辑书籍 */
    editBook = (record) => {
        record.editType = 'edit';
        
        this.setState({eidtRecord: record});
        this.setState({editMenuVisible: true});
    }

    /**提交表单 */
    submitForm = () => {
        const submittedFormData = this.childForm.handleSubmit();
        submittedFormData.publishingTime = submittedFormData.publishingTime.format('YYYY-MM');
        const _this  = this;
        if(submittedFormData !== false){
            // 提交表单
            if(this.state.eidtRecord.editType === 'add'){
                // 添加操作
                axios.post('/bookController/addBook',{
                    ...submittedFormData
                }).then(function (response) {
                    _this.loadData();
                }).catch(function (error) {
                    console.log(error);
                });
            }else if(this.state.eidtRecord.editType === 'edit'){
                // 编辑操作
                axios.post('/bookController/editBook',{
                    key : _this.state.eidtRecord.key,
                    name: submittedFormData.name,
                    author: submittedFormData.author,
                    publishingHouse: submittedFormData.publishingHouse,
                    publishingTime: submittedFormData.publishingTime,
                    type: submittedFormData.type,
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

    render(){
        const _this = this;
        // moment(editRole.publishingTime, 'YYYY-MM').format('YYYY-MM');
        const columns = [
            {title: '名称', dataIndex: 'name'},
            {title: '作者', dataIndex: 'author'},
            {title: '出版社', dataIndex: 'publishingHouse'},
            {title: '出版时间', dataIndex: 'publishingTime'},
            {title: '图书类型', dataIndex: 'type', render: function(text, record, index){
                let bookTypeName = text;
                bookTypeName = _this.state.bookTypeMap[bookTypeName];
                if(bookTypeName === undefined){
                    bookTypeName  = text;
                }
                return bookTypeName;
                
            }},
            {title: '总数', dataIndex: 'total'},
            {title: '借出数', dataIndex: 'borrowed'},
            {title: '未借出数', dataIndex: 'circulated'},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{

                    return (
                        <div>
                            <a onClick={() =>_this.editBook(record)}><Icon type="edit" /></a>
                            <a onClick={() =>_this.viewDetailBook(record)}><Icon type="search" /></a>
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
                    <Icon type="plus" />添加书籍
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button type="primary" onClick={this.deleteSelectedRows}>
                    <Icon type="delete" />删除选中书籍
                </Button>

                <Table
                    pagination = {true}
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
                    onCancel={this.closeEditWindow}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.closeEditWindow}>返 回</Button>,
                        <Button key="submit" type="primary" size="large"  onClick={this.submitForm}>
                            提 交
                        </Button>
                    ]}
                    bodyStyle={{height:'400px'}}
                    width='700px'
                >
                    <EditBook
                        defaultEditRecord = {this.state.eidtRecord}
                        onRef = {this.onRef}
                    >
                    </EditBook>
                </Modal>
                

                <Modal
                    ref="modal"
                    visible={this.state.detailBookVisible}
                    title="添加类型" 
                    onCancel={this.closeDetailBookWindow}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.closeDetailBookWindow}>关  闭</Button>,
                    ]}
                    bodyStyle={{height:'400px'}}
                    width='700px'
                >
                    <DetailBook
                        bookKey = {this.state.viewDetailBookKey}
                        onDetailRef = {this.onDetailRef}
                    >
                    </DetailBook>
                </Modal>

            </MainPage>
        )
    }
}

export default Book;