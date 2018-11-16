import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal} from 'antd'

import {menuSet} from '../../redux/actions/common'
import {connect} from 'react-redux'
import MainPage from '../../component/mainPage'
import CustomIcon from '../../component/icon'
import EditMenu from'./editMenu'

// 选中的列key信息
let selectedRowKeys;

// 图标样式
const iconStyle = {
  fontSize: '36px', 
}

  

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeyArr, selectedRows) => {
    selectedRowKeys = selectedRowKeyArr;
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    // console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    // console.log(selected, selectedRows, changeRows);
  },
};




class Menu extends React.Component{

  constructor(props){
    super(props);

    
    this.state = {
      data: [],
      editMenuVisible: false,
      eidtRecord: {
        // 编辑类型，分为add和edit，add为添加，edit为编辑原类型，默认为添加
        editType: 'add'
      },
      menuKey: '00'
    }

    this.loadData = this.loadData.bind(this);
    this.openEditMenuWindow = this.openEditMenuWindow.bind(this);
    this.onRef = this.onRef.bind(this);
    this.closeEditWindow = this.closeEditWindow.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteSelectedRows = this.deleteSelectedRows.bind(this);
    this.editTableMenu = this.editTableMenu.bind(this);
    this.openBlankEditWindow = this.openBlankEditWindow.bind(this);
  }

  componentWillMount(){
    this.loadData();
    
  }

  componentDidMount(){

  }

  // 打开编辑菜单界面
  openEditMenuWindow(){
    this.setState({editMenuVisible: true});
  }

  // 关闭编辑窗口
  closeEditWindow(){
    this.setState({editMenuVisible: false});
    this.childForm.props.form.resetFields();
  }


  // 打开空的编辑界面
  openBlankEditWindow(){
    let record = {
      editType: 'add'
    }
    
    this.setState({eidtRecord: record});
    this.openEditMenuWindow();
  }


  // 编辑记录
  editTableMenu(record){
    record.editType = 'edit';
    this.setState({eidtRecord: record});
    this.openEditMenuWindow();
    // console.log('edit operation'+record)
  }

  // 执行删除操作
  deleteSelectedRows(){
    const _this = this;
    
    if(selectedRowKeys == undefined || selectedRowKeys.length == 0){
      console.log('请选中一项')
    }else{

      // 删除操作
      axios.post('/menuController/delMenu',{
        keys: selectedRowKeys
      }).then(function (response) {
        _this.loadData();
      }).catch(function (error) {
        console.log(error);
      });

    }
  }

  // 获得权限菜单数据
  loadData(){
    const _this = this;
    axios.post('/menuController/getMenu',{
      params: {
      }
    }).then(function (response) {
      _this.setState({data: response.data});
    }).catch(function (error) {
        console.log(error);
    });
  }

  onRef(ref){
    this.childForm = ref;
  }

  // 提交编辑表单
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
        axios.post('/menuController/addMenu',{
          values
        }).then(function (response) {
          _this.loadData();
        }).catch(function (error) {
          console.log(error);
        });
      }else if('edit' === editType){
        // 编辑操作
        axios.post('/menuController/editMenu',{
          values
        }).then(function (response) {
          _this.loadData();
        }).catch(function (error) {
          console.log(error);
        });
      }

    }
  }


  render(){
    const _this = this;
    const data = this.state.data;
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        width: '20%'
      }, {
        title: '地址',
        dataIndex: 'url',
        width: '20%'
      }, {
        title: '图标',
        dataIndex: 'iconType',
        width: '20%',
        render: function(text, record){
          return <CustomIcon type = {text} style={iconStyle}></CustomIcon>;
        }
      },{
        title: '菜单等级',
        dataIndex: 'level',
      },{
        title: '序号',
        dataIndex: 'order',
      },{
        title: '操作',
        dataIndex: 'operation_col',
        render: (text, record, index) => <a onClick={() =>_this.editTableMenu(record)}><Icon type="edit" /></a>
    }];

    return (
      
      <MainPage history={this.props.history}
                >
        <Button type="primary" onClick={this.openBlankEditWindow}><Icon type="plus" />添加菜单</Button>
        &nbsp; &nbsp; &nbsp;       
        <Button type="primary" onClick={this.deleteSelectedRows}><Icon type="delete" />删除选中菜单</Button>
        <div style={{height: '10px'}}></div>
        <Table
          pagination = {false}
          bordered = {true}
          columns={columns} 
          rowSelection={rowSelection} 
          dataSource={data}>
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
                bodyStyle={{height:'400px'}}
                width='700px'>
            <EditMenu onRef={this.onRef} defaultEditRecord={this.state.eidtRecord}></EditMenu>
        </Modal>
      </MainPage>
    )
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    setMenuKey: () =>{
      dispatch(menuSet(ownProps.currentMenuKey));
    }
  }
}

// export default Menu;
export default connect(
  null,
  mapDispatchToProps
)(Menu);

