import React from 'react'
import {Table, Modal, Button, Icon, Tooltip} from 'antd'
import axios from 'axios'

/**图书详情 */
class DetailBook extends React.Component{

    state = {
        data: [],
        borrowedKeyAndValue: {}
    }
    

    componentWillMount(){
        this.props.onDetailBookLoadFun(this.loadData);
        this.getBorrowedKeyAndValue();
    }

    addDetailBook = () => {
        const _this = this;
        axios.post('/detailBookController/addDetailBook',{
            bookKey: _this.props.bookKey
        }).then(function (response) {
            _this.loadData();
            _this.props.loadParentTable();
        }).catch(function (error) {
            console.log(error);
        });
    }


    getBorrowedKeyAndValue = () => {
        const _this = this;
        axios.post('/detailBookController/getBorrowedKeyAndValue',{
        }).then(function (response) {
            _this.setState({borrowedKeyAndValue: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    loadData = () => {
        const _this = this;
        axios.post('/detailBookController/getBookByBookKey',{
            bookKey : _this.props.bookKey
        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**销毁图书 */
    delDetailBook = (record) => {
        const _this = this;
        axios.post('/detailBookController/delDetailBook',{
            key: record.key
        }).then(function (response) {
            _this.loadData();
            _this.props.loadParentTable();
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){

        const _this = this;

        let tableDatasource = this.props.detailBookData;
        if(this.state.data.length != 0 ){
            tableDatasource = this.state.data;
        }

        const columns = [
            {title: 'key', dataIndex: 'key',width: '200px'},
            {title: '借出状态', dataIndex: 'borrowed', render: function(text, record, index){
                
                let borrowState = "";
                borrowState = _this.state.borrowedKeyAndValue[text];
                return borrowState;
                
            },width: '120px'},
            {title: '借阅用户', dataIndex: 'borrowUserKey',width: '120px'},
            {title: '借出时间', dataIndex: 'borrowTime',width: '130px'},
            {title: '应归还时间', dataIndex: 'shouldReturnTime',width: '130px'},
            {
                title: '操作',
                dataIndex: 'operation_col',
                render: (text, record, index) =>{
                    if(record.borrowed === 0){

                        return (
                            <div>
                                <Tooltip title= "销毁该本图书">
    
                                    <a onClick={() =>_this.delDetailBook(record)}><Icon type="delete" /></a>
                                </Tooltip>
                            </div>
                        )
                    }
                },
                width: '80px'
            }
        ]


        return (
            <div>
                <Button type="primary" onClick={this.addDetailBook}>
                    <Icon type="plus" />添加此类图书
                </Button>
                <Table
                    pagination = {{
                        pageSize:4,
                        showTotal: (total, range) => (`${range[0]}-${range[1]}    总计  ${total} 册`)
                    }}
                    bordered = {true}
                    columns = {columns}
                    // dataSource = {this.props.detailBookData}
                    dataSource = {tableDatasource}
                    scroll = {{x:800,y: 200}}
                >
                </Table>
            </div>
        )
    }
}

export default DetailBook
