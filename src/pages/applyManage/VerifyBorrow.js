import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal, notification} from 'antd'
import {connect} from 'react-redux'

import MainPage from '../../component/mainPage'

class VerifyBorrow extends React.Component{

    state = {
        menuKey: '30',
        userKeyAndName: {},
        borrowedKeyAndValue: {},
        allApplies: [],
        showApplies: []
    }

    componentWillMount() {
        this.getBorrowedKeyAndValue();
        this.initUserKeyAndName();
        this.loadBorrowApplies();
    }

    /**获得detailbook key值和名称对应关系 */
    getBorrowedKeyAndValue = () => {
        const _this = this;
            axios.post('/borrowApplyController/getBorrowedKeyAndValueAction',{
        }).then(function (response) {
            _this.setState({borrowedKeyAndValue: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**用户 key值和名称对应关系 */
    initUserKeyAndName = () => {
        const _this = this;

        axios.post('/userController/getUserKeyAndName',{
        }).then(function (response) {
            _this.setState({
                userKeyAndName: response.data,
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**获得需要审批的借阅申请及归还申请及被驳回的申请 */
    loadBorrowApplies = () => {
        const _this = this;
        axios.post('/borrowApplyController/getBorrowAppliesNeedVerifiedAction',{
        }).then(function (response) {
            _this.setState({
                allApplies: response.data,
                showApplies: response.data,
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const _this = this;

        const columns = [
            {title: '借阅人', dataIndex: 'borrowUserKey', render: function(text, record, index){
                
                let borrowUsername =  _this.state.userKeyAndName[text];
                return borrowUsername;
                
            }},
            {title: '图书名称', dataIndex: 'name'},
            {title: '作者', dataIndex: 'author'},
            {title: '出版社', dataIndex: 'publishingHouse'},
            {title: '出版时间', dataIndex: 'publishingTime'},
            {title: '图书类型', dataIndex: 'type'},
            {title: '申请时间', dataIndex: 'applyTime'},
            {title: '借阅时间', dataIndex: 'borrowTime'},
            {title: '应归还时间', dataIndex: 'shouldReturnTime'},
            {title: '归还时间', dataIndex: 'returnTime'},
            {title: '审核信息', dataIndex: 'auditingMessage'},
            {title: '借阅状态', dataIndex: 'borrowed', render: function(text, record, index){
                
                let borrowState = "";
                borrowState = _this.state.borrowedKeyAndValue[text];
                return borrowState;
                
            }},
        ]

        return (
            <MainPage
                history = {this.props.history}
                reduxMenuKey = {this.state.menuKey}
            >
                <Table
                    pagination = {false}
                    bordered = {true}
                    columns = {columns}
                    dataSource = {this.state.showApplies}
                >

                </Table>
            </MainPage>
        )
    }
}

export default VerifyBorrow;