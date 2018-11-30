import React from 'react'
import {Icon, Drawer, Tree, Button} from 'antd'
import axios from 'axios'

const TreeNode = Tree.TreeNode;

class RoleMenuRel extends React.Component{


  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: ['01'],
    menuTreeData: [],
    defaultCheckedKeys: []
  }


  componentWillMount(){
    this.loadTreeData();
    this.props.onRoleMenuRelRef(this);
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });

    
  }

  onCheck = (checkedKeys, e) => {
    console.log('checkedKeys', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', selectedKeys);
    this.setState({ selectedKeys });
  }

  // 获得默认权限
  setDefaultCheckedKeys = (toogleRoleMenuRelDrawn) => {
    const _this = this;
    axios.post('/roleMenuController/getAllRoleMenu',{
      roleId: this.props.editRoleMenuRelRole.key
    }).then(function (response) {
      _this.setState({checkedKeys: response.data});
      _this.setState({defaultCheckedKeys: response.data});
      // 打开抽屉div
      toogleRoleMenuRelDrawn();

    }).catch(function (error) {
        console.log(error);
    });

  }


  // 加载权限树需要的数据
  loadTreeData = () => {
    const _this = this;
    axios.post('/menuController/getMenu',{
      params: {
      }
    }).then(function (response) {
      _this.setState({menuTreeData: response.data});
    }).catch(function (error) {
        console.log(error);
    });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.key} />;
    });
  }
  
  // 提交修改信息
  submit = () =>{
    const _this = this;
    const defaultCheckedKeys = this.state.defaultCheckedKeys;
    const checkedKeys = this.state.checkedKeys;
    // console.log('原有权限', this.state.defaultCheckedKeys);
    // console.log('现有权限', this.state.checkedKeys);
    // 需要删除的角色权限
    let delRoleMenuKeys = [];
    for (let i = 0; i < defaultCheckedKeys.length; i++) {
      const defaultCheckedKey = defaultCheckedKeys[i];
      if(checkedKeys.indexOf(defaultCheckedKey) === -1){
        delRoleMenuKeys.push(defaultCheckedKey);
      }
    }
    // 需要增加的角色权限
    let addRoleMenuKeys = [];
    for (let i = 0; i < checkedKeys.length; i++) {
      const checkedKey = checkedKeys[i];
      if(defaultCheckedKeys.indexOf(checkedKey) === -1){
        addRoleMenuKeys.push(checkedKey);
      }
    }


    axios.post('/roleMenuController/delRoleMenu',{
      delKeys: delRoleMenuKeys,
      roleKey: this.props.editRoleMenuRelRole.key
    }).then(function (response) {

    }).catch(function (error) {
        console.log(error);
    });

    axios.post('/roleMenuController/addRoleMenu',{
      addKeys: addRoleMenuKeys,
      roleKey: this.props.editRoleMenuRelRole.key
    }).then(function (response) {

    }).catch(function (error) {
        console.log(error);
    });


    this.props.toogleRoleMenuRelDrawn();
  }

  render(){

      return (
          
          <Drawer
              visible={this.props.roleMenuRelDrawn}
              width={300}
              onClose={this.props.toogleRoleMenuRelDrawn}
              placement="right"
              handler={
                  <div >
                  <Icon
                      type={this.props.roleMenuRelDrawn ? 'close' : 'setting'}
                      style={{
                          color: '#fff',
                          fontSize: 20,
                      }}
                  />
                  </div>
              }
              onHandleClick={this.props.toogleRoleMenuRelDrawn}
              style={{
                  zIndex: 999,
              }}
          >
              <h2>{this.props.editRoleMenuRelRole.name}权限信息</h2>

                <Tree
                  checkable
                  onExpand={this.onExpand}
                  expandedKeys={this.state.expandedKeys}
                  autoExpandParent={this.state.autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={this.state.checkedKeys}
                  // selectedKeys={[]}
                  defaultExpandParent = {true}
                  defaultExpandAll = {true}
                  checkStrictly = {false}
                >
                  {this.renderTreeNodes(this.state.menuTreeData)}
                </Tree>
              <Button type="primary" onClick={this.submit}>提交</Button>
          </Drawer>
      )
  }
}


export default RoleMenuRel;