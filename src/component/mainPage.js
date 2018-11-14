import { Layout, Menu, Icon } from 'antd';
import React from 'react'
import axios from 'axios'

import './mainPage.css'
import CustomIcon from './icon'

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class mainPage extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          collapsed: false,
          menuData: [],
          menuItem: null
      }
      this.reloadContent = this.reloadContent.bind(this);
      this.loadMenuData = this.loadMenuData.bind(this);
      this.getMentItem = this.getMentItem.bind(this)
  }

  componentWillMount(){
    this.loadMenuData();
  }


  /** 加载菜单信息 */
  loadMenuData(){
    const _this = this;
    axios.post('/menuController/getMenu',{
      params: {
      }
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
    debugger;
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
                defaultSelectedKeys={['6']} 
                defaultOpenKeys = {['sub1']} 
                mode="inline"
                onClick = {reloadContent}>
            {/* <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3" url='./Story' >
                <Icon type="user" />
                <span>Option 2</span>
              </Menu.Item>
              <Menu.Item key="4" >Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item> */}
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

export default mainPage;