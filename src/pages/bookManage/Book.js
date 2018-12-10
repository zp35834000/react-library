import React from 'react'
import {Table, Modal, Button, Icon, DatePicker} from 'antd'
import axios from 'axios'
// import locale from 'antd/lib/date-picker/locale/zh_CN';
import locale from 'antd/lib/date-picker/locale/zh_TW'
import MainPage from '../../component/mainPage'
import EditBook from './EditBook'

const { MonthPicker } = DatePicker;
class Book extends React.Component{

    state = {
        menuKey: '11',
        data: [],
        bookTypeMap: {},
        eidtRecord: {},
        selectedRowKeyArr: [],
        editMenuVisible: false
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
    viewDetailBook(record) {
        
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

    render(){
        const _this = this;

        const columns = [
            {title: '名称', dataIndex: 'name'},
            {title: '作者', dataIndex: 'author'},
            {title: '出版社', dataIndex: 'publishingHouse'},
            {title: '出版时间', dataIndex: 'publicshingTime'},
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
                <MonthPicker  format='YYYY-MM' locale={locale}/>
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
                        <Button key="back" type="ghost" size="large" onClick={this.closeDetailBookWindow}>返 回</Button>,
                        <Button key="submit" type="primary" size="large"  onClick={this.submitFormDetailBook}>
                            提 交
                        </Button>
                    ]}
                    bodyStyle={{height:'200px'}}
                    width='700px'
                >
                    详情界面
                </Modal>

            </MainPage>
        )
    }
}

export default Book;