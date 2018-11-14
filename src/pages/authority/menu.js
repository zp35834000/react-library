import React from 'react'
import axios from 'axios'
import {Table,Button, Icon, Modal} from 'antd'

import MainPage from '../../component/mainPage'
import CustomIcon from '../../component/icon'
import EditMenu from'./editMenu'

// 图标样式
const iconStyle = {
  fontSize: '36px', 
}

// 列信息
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
      console.log(record);
      return <CustomIcon type = {text} style={iconStyle}></CustomIcon>;
    }
  },{
    title: '菜单等级',
    dataIndex: 'level',
  },{
    title: '序号',
    dataIndex: 'order',
  }];
  

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

class Menu extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data: [],
      editMenuVisible: false
    }

    this.loadData = this.loadData.bind(this);
    this.openEditMenuWindow = this.openEditMenuWindow.bind(this);
    this.onRef = this.onRef.bind(this);
    this.closeEditWindow = this.closeEditWindow.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
    this.setState({editMenuVisible: false})
  }

  // 获得权限菜单数据

  loadData(){
    const _this = this;
    axios.post('/menuController/getMenu',{
      params: {
      }
    }).then(function (response) {
      _this.setState({data: response.data});
        // console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
  }

  onRef(ref){
    this.childForm = ref;
  }

  // 提交编辑表单
  submitForm(){
    let submitted = this.childForm.handleSubmit();
    if(submitted){

      this.closeEditWindow();
    }
  }


  render(){
    const data = this.state.data;
    return (
      
      <MainPage history={this.props.history}>
        <Button type="primary" onClick={this.openEditMenuWindow}><Icon type="plus" />添加菜单</Button>
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
            <EditMenu onRef={this.onRef}></EditMenu>
        </Modal>
      </MainPage>
    )
  }
}

export default Menu;

