import React from 'react'
import {Table, Modal, Button, Icon} from 'antd'
import axios from 'axios'

import MainPage from '../../component/mainPage'
import EditBookType from './EditBookType'

class BookType extends React.Component{

    state = {
        menuKey: '10',
        data: [],
        selectedRowKeyArr: [],
        eidtRecord:{},
        editMenuVisible: false
    }

    componentWillMount(){
        this.loadData();
    }

    onRef = (ref) => {
        this.childForm = ref;
    }


    closeEditWindow = () =>{
        this.setState({editMenuVisible: false});
    }

    submitForm = () => {

    }


    openBlankEditWindow = () => {
        this.setState({editMenuVisible: true});
    }

    loadData = () =>{
        const _this = this;
        axios.post('/bookTypeController/getAllBookType',{

        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){

        const _this = this;
        const columns = [
            {title: '名称', dataIndex: 'name'},
            {title: '总数', dataIndex: 'total'},
            {title: '借出数', dataIndex: 'borrowed'},
            {title: '未借出数', dataIndex: 'circulated'},
        ]

        // 选中信息
        const rowSelection = {

            onChange: (selectedRowKeyArr, selectedRows) => {
                _this.setState({selectedRowKeyArr: selectedRowKeyArr})
                // selectedRowKeys = selectedRowKeyArr;
                // console.log(`selectedRowKeys: ${selectedRowKeyArr}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <MainPage 
                history={this.props.history}
                reduxMenuKey = {this.state.menuKey}
            >

                <Button type="primary" onClick={this.openBlankEditWindow}>
                    <Icon type="plus" />添加类型
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button type="primary" onClick={this.deleteSelectedRows}>
                    <Icon type="delete" />删除选中类型
                </Button>

                <Table
                    pagination = {false}
                    bordered = {true}
                    columns = {columns}
                    dataSource = {this.state.data}
                    rowSelection = {rowSelection}
                >
                </Table>

                <Modal
                    ref="modal"
                    visible={this.state.editMenuVisible}
                    title="添加类型" 
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
                    <EditBookType
                        onRef = {this.onRef}
                        defaultEditRecord = {this.state.eidtRecord}
                    >

                    </EditBookType>
                </Modal>
            </MainPage>
        )
    }
}

export default BookType;