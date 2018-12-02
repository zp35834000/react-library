import { Layout, Menu, Icon } from 'antd';
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {ajax as jqueryAjax} from 'jquery'

import './mainPage.css'
import CustomIcon from './icon'
import {chechAuthor} from '../util/authorUtil'
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class mainPage extends React.Component {

  constructor(props){
      super(props);


      this.state = {
          collapsed: false,
          menuData: [],
          menuItem: null,
          defaultSelectedKeys: [],
          defaultOpenKeys: []
      }


      this.reloadContent = this.reloadContent.bind(this);
      this.loadMenuData = this.loadMenuData.bind(this);
      this.getMentItem = this.getMentItem.bind(this);
      this.setSelectKeys = this.setSelectKeys.bind(this);
  }


  componentWillMount(){
    // 检验登录权限
    chechAuthor(this.props.loginUserKey.userKey, 
      this.props.reduxMenuKey, this.props.history);

    this.loadMenuData();
    this.setSelectKeys();
  }

  // 设置默认高亮展示选项
  setSelectKeys(){
    const _this = this;
    const selectMenuKeys = this.props.reduxMenuKey;
    _this.setState({defaultSelectedKeys: [selectMenuKeys]});
    // 获得默认展开的节点,需要注意的是，这里必须同步请求
    // 可能是defaultOpenKeys在初次设置之后，如果在改变值，是无效的
    jqueryAjax({
      type: 'post',
      url: '/menuController/getParentMenuKey',
      async: false,
      data: {
        selectMenuKeys
      },
      success: (data) =>{
        let dataObj = JSON.parse(data);
        _this.setState({defaultOpenKeys: dataObj});
      }
    })
  }

  /** 加载菜单信息 */
  loadMenuData(){
    const _this = this;
    axios.post('/menuController/getMenuByUserKey',{
      userKey: this.props.loginUserKey.userKey
    }).then(function (response) {
      _this.setState({menuData: response.data});
      _this.getMentItem();
    }).catch(function (error) {
        console.log(error);
    });
  }



  /** 拼接menu item*/
  getMentItem(){
    const _this = this;
    const menusData = this.state.menuData;
    let menuItem = menusData.map((menuObj) => 
                          _this.getSingleMengJsx(menuObj)
                          )
    this.setState({menuItem});
    return menuItem;
  }


  getSingleMengJsx(menuObj){
    const _this = this;
    if(menuObj.children){
      return (<SubMenu
                key={menuObj.key}
                title={<span><CustomIcon type={menuObj.iconType} /><span>  {menuObj.name}</span></span>}
              >
                {menuObj.children.map((temp) => _this.getSingleMengJsx(temp))}
              </SubMenu>);
    }else{
      return   (<Menu.Item 
                  key={menuObj.key} 
                  url={menuObj.url} 
                  className={"anticon-library anticon-"+menuObj.iconType}
                >
                  <span>  {menuObj.name}</span>
                </Menu.Item>);
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  reloadContent(item, key, path){
    console.log(item.item.props.url);
    console.log(this.props.history);
    this.props.history.push(item.item.props.url);
  }
    


  render() {

    const reloadContent = this.reloadContent;



    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" 
                defaultSelectedKeys={this.state.defaultSelectedKeys}
                defaultOpenKeys = {this.state.defaultOpenKeys}
                mode="inline"
                onClick = {reloadContent}
                >
            {this.state.menuItem}
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }} hasSider='true'>
              {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React Library Created By zp
          </Footer>
        </Layout>
        
      </Layout>
    );
  }
}


function mapStateToProps(state){
  const {loginUserKey} = state;
  return {
    loginUserKey
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
      dispatch
  }
}


// export default Menu;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(mainPage);
