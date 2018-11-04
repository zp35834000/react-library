import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Modal, Button, Table} from 'antd'

import {login} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'
import RegistrationForm from '../RegistrationForm'
class Home extends React.Component{
    constructor(props){
        super(props);

        const columns = [
            { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
            { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
            { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
            { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
            { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
            { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
            { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
              title: 'Action',
              key: 'operation',
              fixed: 'right',
              width: 100,
              render: () => <a href="javascript:;">action</a>,
            },
        ];
        this.state = {
            visible: false,
            loading: false,
            data: [],
            columns: columns
        }
        this.login = this.login.bind(this);
        this.mockRondom = this.mockRondom.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onRef = this.onRef.bind(this);
    }

    showModal(){
        this.setState({
            visible: true
        })
    }

    handleCancel() {
        this.setState({ visible: false });
    }

    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
    }

    componentWillMount(){
        this.getTableData();
    }

    mockRondom(){
        
        window.open('./Story')

        axios.post('/test',{
            params: {
                id: 12345
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    login() {
        this.props.history.push('/story');
        const { dispatch } = this.props
        dispatch(login('ownProps.name'));
        // this.props.changeUserName();
    }

    getTableData(){
        var data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
              key: i,
              name: `Edrward ${i}`,
              age: 32,
              address: `London Park no. ${i}`,
            });
        }
        this.setState({ data})
    }


    submitForm() {
        this.childForm.handleSubmit();
    }

    onRef(ref){
        this.childForm = ref;
    }

    render(){
        const columns = this.state.columns;
        const data = this.state.data;
        return (
            <MainPage history={this.props.history}>
                    <h1 className='homePage'>home page</h1>
                    <a onClick={this.mockRondom}>login</a>
                    
                    <Button type="primary" onClick={this.showModal}>
                        显示对话框
                    </Button>
                    <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
                    <Modal  ref="modal"
                            visible={this.state.visible}
                            title="用户注册" 
                            onOk={this.handleOk} 
                            onCancel={this.handleCancel}
                            footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.submitForm}>
                                提 交
                            </Button>
                            ]}
                            bodyStyle={{height:'600px'}}
                            width='700px'>
                        <RegistrationForm onRef={this.onRef}></RegistrationForm>
                    </Modal>
            </MainPage>
            
        )
    }
}

// Home.defaultProps = {
//     name: 'defaultName'
// }

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeUserName: () =>{
            // debugger;
            dispatch(login('ownProps.name'))
            // console.log('11111')
        },
        dispatch
    }
}

Home = connect(
    null,
    mapDispatchToProps
)(Home)

export default Home;