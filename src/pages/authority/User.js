import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal} from 'antd'
import {connect} from 'react-redux'


import {menuSet} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'
import EditUser from './EditUser'

class User extends React.Component{
    state = {
        menuKey: '02',
        selectedRowKeyArr: [],
        editRecord: {},
        data: [],
        editMenuVisible: false,
        eidtRecord: {}
    }


    componentWillMount(){
        this.props.dispatch(menuSet(this.state.menuKey));
        this.loadUserData();
    }

    onRef = (ref) => {
        this.childForm = ref;
    }
    // 打开编辑窗口
    openEditWindow = () =>{
        this.setState({editMenuVisible: true});
    }

    // 添加角色操作
    openBlankEditWindow(){
        let blankEidtRecord = {
            // 编辑类型，分为add和edit，add为添加，edit为编辑原类型，默认为添加
            editType: 'add'
        };
        this.setState({eidtRecord: blankEidtRecord});
        this.openEditWindow();
    }


    // 关闭编辑窗口
    closeEditWindow= () =>{
        this.setState({editMenuVisible: false});
        // 重置所有输入框值
        // this.childForm.props.form.resetFields();
    }

    // 编辑用户信息
    editUser = (record) =>{
        record.editType = 'edit';
        this.setState({
            eidtRecord: record
        })
        this.openEditWindow();
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
            {title: '性别', dataIndex: 'sex', render: function(text, record, index){
                if(text === '1'){
                    return '男'
                }
                if(text === '0'){
                    return '女'
                }
            }},
            {title: '电话', dataIndex: 'phone'},
            {title: '地址', dataIndex: 'address'},
            {title: '角色', dataIndex: 'roleName', render: function(text){
                // console.log(text);
                return text.substring(0, text.length-1);
                // return '111';
            }},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{

                    return (
                        <div>
                            <a onClick={() =>_this.editUser(record)}><Icon type="edit" /></a>
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

                <Button type="primary" onClick={this.openBlankEditWindow}>
                    <Icon type="plus" />添加用户
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button type="primary" onClick={this.deleteSelectedRows}>
                    <Icon type="delete" />删除选中用户
                </Button>

                <Table
                    pagination = {false}
                    bordered = {true}
                    columns={columns} 
                    rowSelection={rowSelection} 
                    dataSource={this.state.data}>
                </Table>
                <Modal  ref="modal"
                        visible={this.state.editMenuVisible}
                        title="添加菜单" 
                        onOk={this.handleOk} 
                        onCancel={this.closeEditWindow}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.closeEditWindow}>返 回</Button>,
                            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.submitForm}>
                                提 交
                            </Button>
                        ]}
                        bodyStyle={{height:'700px'}}
                        width='700px'>
                    <EditUser onRef={this.onRef} defaultEditRecord={this.state.eidtRecord}></EditUser>
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

export default connect(
    null,
    mapDispatchToProps
)(User);