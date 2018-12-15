import React from 'react'
import {Table, Button, Icon, Tooltip} from 'antd'
import axios from 'axios'

class BorrowAllowed extends React.Component{

    state = {
        data: [],
        bookTypeMap: {},
        selectedRowKeyArr: []
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    componentWillReceiveProps(){
        this.props.onRef(this);
    }

    componentWillMount() {
        this.getBooksCanBorrow();
        this.loadBookTypeMap();
        this.props.onRef(this);
    }

    getBooksCanBorrow = () => {
        const _this = this;
        axios.post('/bookController/getBooksCanBorrowAction',{

        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }


    loadBookTypeMap = () => {
        const _this = this;
        axios.post('/bookTypeController/getSimpleBook',{

        }).then(function (response) {
            _this.setState({bookTypeMap: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    

    render() {


        const columns = [
            {title: '名称', dataIndex: 'name', width: '200px'},
            {title: '作者', dataIndex: 'author', width: '200px'},
            {title: '出版社', dataIndex: 'publishingHouse', width: '200px'},
            {title: '出版时间', dataIndex: 'publishingTime', width: '200px'},
            {title: '图书类型', dataIndex: 'type', render: function(text, record, index){
                let bookTypeName = text;
                bookTypeName = _this.state.bookTypeMap[bookTypeName];
                if(bookTypeName === undefined){
                    bookTypeName  = text;
                }
                return bookTypeName;
                
            }, width: '200px'}
        ]

        const _this = this;

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
            selectedRowKeys: _this.state.selectedRowKeyArr
        };

        return (
            <Table
                pagination = {{
                    pageSize:4,
                    showTotal: (total, range) => (`${range[0]}-${range[1]}    总计  ${total} 册`)
                }}
                bordered = {true}
                columns = {columns}
                // dataSource = {this.state.data}
                dataSource = {this.props.booksCanBorrow}
                scroll = {{x:800,y: 200}}
                rowSelection = {rowSelection}
            >

            </Table>
        )
    }
}

export default BorrowAllowed;