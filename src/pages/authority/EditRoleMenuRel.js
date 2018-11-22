import React from 'react'
import {Icon, Drawer, Tree, Button} from 'antd'
import axios from 'axios'

const TreeNode = Tree.TreeNode;

class MenuTree extends React.Component {


  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: ['01'],
    selectedKeys: [],
    menuTreeData: [],
    defaultSelectedKeys: ['01']
  }


  componentWillMount(){
    this.loadTreeData();
    this.props.onRoleMenuRelRef(this);
    // console.log(this.props.onRoleMenuRelRef);
    this.getExpandedKeys();
    // if(this.props.editRoleMenuRelRole){

      this.setDefaultCheckedKeys();
    // }
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });

    
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  // 获得默认权限
  setDefaultCheckedKeys = () => {
    this.setState({ checkedKeys: ['01'] });

    const _this = this;
    axios.post('/roleMenuController/getAllRoleMenu',{
      roleId: this.props.editRoleMenuRelRole.key
    }).then(function (response) {
      // console.log(this.props.editRoleMenuRelRole.key);
      _this.setState({checkedKeys: response.data});
      // _this.setState({checkedKeys: ['01']});
      _this.setState({defaultCheckedKeys: response.data});

    }).catch(function (error) {
        console.log(error);
    });

  }

  getExpandedKeys(){
    const _this = this;
    axios.post('/menuController/getMenuHasChidrenAction',{
      params: {
      }
    }).then(function (response) {
      _this.setState({expandedKeys: response.data});
    }).catch(function (error) {
        console.log(error);
    });
  }

  // 加载权限树需要的数据
  loadTreeData(){
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

  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        // checkedKeys={this.state.checkedKeys}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={[]}
        defaultExpandParent = {true}
        defaultSelectedKeys = {this.state.defaultSelectedKeys}
        defaultExpandAll = {true}
        defaultCheckedKeys = {[]}
      >
        {this.renderTreeNodes(this.state.menuTreeData)}
      </Tree>
    );
  }
}

class RoleMenuRel extends React.Component{

    constructor(props){
        super(props);
        
    }

    // 提交修改信息
    submit(){

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
                <MenuTree
                  editRoleMenuRelRole = {this.props.editRoleMenuRelRole}
                  onRoleMenuRelRef = {this.props.onRoleMenuRelRef}
                >
                </MenuTree>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </Drawer>
        )
    }
}


export default RoleMenuRel;