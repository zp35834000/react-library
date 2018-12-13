import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal, Tooltip} from 'antd'
import {connect} from 'react-redux'

import MainPage from '../../component/mainPage'
import BorrowAllowed from './BorrowAllowed'

class Borrow extends React.Component{

    state = {
        menuKey: '20',
        borrowBooks: [],
        borrowedKeyAndValue: {},
        detailBookVisible: false
    }


    componentWillMount(){
        this.getBorrowBooks();
        this.getBorrowedKeyAndValue();
    }

    /**关闭可借阅图书详情页 */
    closeDetailBookWindow = () => {
        this.setState({detailBookVisible: false});
    }

    /**打开可借阅图书详情页 */
    borrowBook = () => {
        this.setState({detailBookVisible: true});
    }


    /**提交借阅申请 */
    submitBorrow = () => {
        const _this = this;
    }


    getBorrowedKeyAndValue = () => {
        const _this = this;
        axios.post('/detailBookController/getBorrowedKeyAndValue',{
        }).then(function (response) {
            _this.setState({borrowedKeyAndValue: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**获得当前登录用户借阅的图书信息 */
    getBorrowBooks = () => {
        const _this = this;
        axios.post('/detailBookController/getDetailByUserKey',{
            userKey: this.props.loginUserKey.userKey
        }).then(function (response) {
            _this.setState({borrowBooks: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**归还图书，进入归还审批 */
    returnBook = (record) => {
        const _this = this;
        axios.post('/detailBookController/setDetailReturnReview',{
            key: record.key
        }).then(function (response) {
            _this.getBorrowBooks();
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){
        const _this = this;

        const columns = [
            {title: '图书名称', dataIndex: 'name'},
            {title: '作者', dataIndex: 'author'},
            {title: '出版社', dataIndex: 'publishingHouse'},
            {title: '出版时间', dataIndex: 'publishingTime'},
            {title: '图书类型', dataIndex: 'type'},
            {title: '借阅时间', dataIndex: 'borrowTime'},
            {title: '应归还时间', dataIndex: 'shouldReturnTime'},
            {title: '借出状态', dataIndex: 'borrowed', render: function(text, record, index){
                
                let borrowState = "";
                borrowState = _this.state.borrowedKeyAndValue[text];
                return borrowState;
                
            }},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{

                    return (
                        <div>
                            <a onClick={() =>_this.returnBook(record)}>归还图书</a>
                        </div>
                    )
                } 
            }
        ]

        return (
            <MainPage
                history = {this.props.history}
                reduxMenuKey = {this.state.menuKey}
            >
                <Button type="primary" onClick={this.borrowBook}>
                    <Icon type="plus" />借阅书籍
                </Button>
                <Table
                    pagination = {false}
                    bordered = {true}
                    columns = {columns}
                    dataSource = {this.state.borrowBooks}
                    title = {() => '已借阅图书'}
                >
                </Table>

                <Modal
                    ref="modal"
                    visible={this.state.detailBookVisible}
                    title="请选择借阅书籍" 
                    onCancel={this.closeDetailBookWindow}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.closeDetailBookWindow}>返 回</Button>,
                        <Button key="submit" type="primary" size="large"  onClick={this.submitBorrow}>
                            提 交
                        </Button>
                    ]}
                    bodyStyle={{height:'400px'}}
                    width='900px'
                >
                    <BorrowAllowed>

                    </BorrowAllowed>
                </Modal>
            </MainPage>
        )
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        dispatch
    }
}


function mapStateToProps(state){
    const {loginUserKey} = state;
    return {
        loginUserKey
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Borrow);