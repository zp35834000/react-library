import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal} from 'antd'
import {connect} from 'react-redux'


import {menuSet} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'

class User extends React.Component{
    state = {
        menuKey: '02',
        selectedRowKeyArr: [],
        editRecord: {},
        data: []
    }


    componentWillMount(){
        this.props.dispatch(menuSet(this.state.menuKey));
        this.loadUserData();
    }

    // 编辑用户信息
    editUser = (record) =>{

    }
    
    // 加载用户信息
    loadUserData = () => {
        const _this = this;
        axios.post('/userController/getAllUser',{

        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){

        const _this = this;
        const columns = [
            {title: '用户名', dataIndex: 'username'},
            {title: '姓名', dataIndex: 'name'},
            {title: '性别', dataIndex: 'sex'},
            {title: '电话', dataIndex: 'phone'},
            {title: '地址', dataIndex: 'address'},
            {title: '角色', dataIndex: 'roleName'},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{

                    return (
                        <div>
                            <a onClick={() =>_this.editUser()}><Icon type="edit" /></a>
                        </div>
                    )
                } 
            }
        ];

        // 选中信息
        const rowSelection = {
            onChange: (selectedRowKeyArr, selectedRows) => {
                this.setState({selectedRowKeys: selectedRowKeyArr})
                // selectedRowKeys = selectedRowKeyArr;
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <MainPage   history={this.props.history}>
                <Table
                    pagination = {false}
                    bordered = {true}
                    columns={columns} 
                    rowSelection={rowSelection} 
                    dataSource={this.state.data}>
                </Table>

            </MainPage>
        )
    }
}


function mapDispatchToProps(dispatch, ownProps){
    return {
        dispatch
    }
}

export default connect(
    null,
    mapDispatchToProps
)(User);