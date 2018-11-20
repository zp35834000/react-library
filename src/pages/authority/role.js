import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal} from 'antd'
import {connect} from 'react-redux'

import {menuSet} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'
import EditRole from './editRole'
import RoleMenuRel from './EditRoleMenuRel'




class Role extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menuKey: '01',
            data: [],
            editMenuVisible: false,
            eidtRecord: {
                // 编辑类型，分为add和edit，add为添加，edit为编辑原类型，默认为添加
                editType: 'add'
            },
            // 选中的列key值集合
            selectedRowKeys: [],
            // 设置用户菜单关系抽屉界面是否显示
            roleMenuRelDrawn: false,
            editRoleMenuRelRole: {}
        }

        this.props.dispatch(menuSet(this.state.menuKey));

        this.loadData = this.loadData.bind(this);
        this.editRole = this.editRole.bind(this);
        this.openEditWindow = this.openEditWindow.bind(this);
        this.closeEditWindow = this.closeEditWindow.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onRef = this.onRef.bind(this);
        this.openBlankEditWindow = this.openBlankEditWindow.bind(this);
        this.deleteSelectedRows = this.deleteSelectedRows.bind(this);
        this.toogleRoleMenuRelDrawn = this.toogleRoleMenuRelDrawn.bind(this);
        this.editRoleMenuRel = this.editRoleMenuRel.bind(this);
    }
    
    componentWillMount(){
        this.loadData();
    }

    // 重新设置抽屉的显示与否
    toogleRoleMenuRelDrawn(){
        const ifRoleMenuRelDrawn = this.state.roleMenuRelDrawn;
        this.setState({roleMenuRelDrawn: !ifRoleMenuRelDrawn});
    }

    // 打开编辑窗口
    openEditWindow(){
        this.setState({editMenuVisible: true});
    }

    // 关闭编辑窗口
    closeEditWindow(){
        this.setState({editMenuVisible: false});
        // 重置所有输入框值
        this.childForm.props.form.resetFields();
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

    // 编辑角色信息
    editRole(record){
        record.editType = 'edit';
        this.setState({
            eidtRecord: record
        })
        this.openEditWindow();
    }

    // 编辑角色权限
    editRoleMenuRel(record){
        this.setState({editRoleMenuRelRole: record});
        this.toogleRoleMenuRelDrawn();
    }

    onRef(ref){
        this.childForm = ref;
    }


    // 执行删除操作
    deleteSelectedRows(){
        const _this = this;
        let selectedRowKeys = this.state.selectedRowKeys;
        if(selectedRowKeys == undefined || selectedRowKeys.length == 0){
            console.log('请选中一项')
        }else{

            // 删除操作
            axios.post('/roleController/delRole',{
                keys: selectedRowKeys
            }).then(function (response) {
                _this.loadData();
            }).catch(function (error) {
                console.log(error);
            });

        }
    }

    // 提交编辑信息
    submitForm(){
        const _this = this;
        let values = this.childForm.handleSubmit();
        // 编辑类型
        const editType = this.state.eidtRecord.editType;
        // 检验成功，则返回值不为false
        if(values !== false){
            // 关闭窗口
            this.closeEditWindow();
            // 提交输入参数


            if('add' === editType){
                // 添加操作
                axios.post('/roleController/addRole',{
                    values
                }).then(function (response) {
                    _this.loadData();
                }).catch(function (error) {
                    console.log(error);
                });
            }else if('edit' === editType){
                // 编辑操作
                axios.post('/roleController/editRole',{
                    values
                }).then(function (response) {
                    _this.loadData();
                }).catch(function (error) {
                    console.log(error);
                });
            }

        }
    }

    // 获得权限菜单数据
    loadData(){
        const _this = this;
        axios.post('/roleController/getAllRoles',{

        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){
        const _this = this;
        // table列信息
        const columns = [
            {title: '名称', dataIndex: 'name'},
            {title: 'id', dataIndex: 'key'},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{

                    return (
                        <div>
                            <a onClick={() =>_this.editRole(record)}><Icon type="edit" /></a>
                            <a onClick={() =>_this.editRoleMenuRel(record)}><Icon type="edit" /></a>
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
        return(
            <MainPage history={this.props.history}>

                <Button type="primary" onClick={this.openBlankEditWindow}><Icon type="plus" />添加角色</Button>
                &nbsp; &nbsp; &nbsp;
                <Button type="primary" onClick={this.deleteSelectedRows}><Icon type="delete" />删除选中角色</Button>

                <Table
                    pagination = {false}
                    bordered = {true}
                    columns={columns} 
                    rowSelection={rowSelection} 
                    dataSource={this.state.data}>
                >
                </Table>
                <RoleMenuRel
                    roleMenuRelDrawn = {this.state.roleMenuRelDrawn}
                    toogleRoleMenuRelDrawn = {this.toogleRoleMenuRelDrawn}
                    editRoleMenuRelRole = {this.state.editRoleMenuRelRole}
                >
                </RoleMenuRel>

                <Modal  
                    ref="modal"
                    visible={this.state.editMenuVisible}
                    title="添加角色" 
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
                    <EditRole onRef={this.onRef} defaultEditRecord={this.state.eidtRecord}></EditRole>
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
)(Role);