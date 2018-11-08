import React from 'react'
import axios from 'axios'
import {Table,Button, Icon} from 'antd'

import MainPage from '../../component/mainPage'
import CustomIcon from '../../component/icon'


const iconStyle = {
  fontSize: '36px', 
}

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
      data: []
    }

    this.setTitle = this.setTitle.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount(){
    this.loadData();
  }

  componentDidMount(){
  }

  // 获得权限菜单数据
  loadData(){
    const _this = this;
    axios.post('/getMenu',{
      params: {
      }
    }).then(function (response) {
      _this.setState({data: response.data});
        // console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
  }

  setTitle(currentPageData){
    // console.log('title ===='+currentPageData);
    return '权限菜单';
  }

  render(){
    const setTitle = this.setTitle;
    const data = this.state.data;
    return (
      <MainPage history={this.props.history}>
        <Icon type='desktop'></Icon>
        <Table
          pagination = {false}
          bordered = {true}
          columns={columns} 
          rowSelection={rowSelection} 
          dataSource={data}>
        </Table>
      </MainPage>
    )
  }
}

export default Menu;

