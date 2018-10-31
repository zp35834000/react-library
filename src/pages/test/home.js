import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Modal, Button} from 'antd'

import {login} from '../../redux/actions/common'
import MainPage from '../../component/mainPage'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: false
        }
        this.login = this.login.bind(this);
        this.mockRondom = this.mockRondom.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
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


    render(){
        return (
            <MainPage history={this.props.history}>
                    <h1 className='homePage'>home page</h1>
                    <a onClick={this.mockRondom}>login</a>
                    
                    <Button type="primary" onClick={this.showModal}>
                        显示对话框
                    </Button>
                    <Modal ref="modal"
                    visible={this.state.visible}
                    title="对话框标题" onOk={this.handleOk} onCancel={this.handleCancel}
                        footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                            提 交
                        </Button>
                        ]}>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
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