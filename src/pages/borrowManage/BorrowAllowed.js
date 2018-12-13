import React from 'react'
import {Table, Button, Icon, Tooltip} from 'antd'
import axios from 'axios'

class BorrowAllowed extends React.Component{

    state = {
        data: [],
        bookTypeMap: {}
    }

    componentWillMount() {
        this.getBooksCanBorrow();
        this.loadBookTypeMap();
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
                debugger;
                let bookTypeName = text;
                bookTypeName = _this.state.bookTypeMap[bookTypeName];
                if(bookTypeName === undefined){
                    bookTypeName  = text;
                }
                return bookTypeName;
                
            }, width: '200px'}
        ]

        const _this = this;
        return (
            <Table
                pagination = {{
                    pageSize:4,
                    showTotal: (total, range) => (`${range[0]}-${range[1]}    总计  ${total} 册`)
                }}
                bordered = {true}
                columns = {columns}
                dataSource = {this.state.data}
                scroll = {{x:800,y: 200}}
            >

            </Table>
        )
    }
}

export default BorrowAllowed;