import React from 'react'
import {Table, Modal, Button, Icon} from 'antd'
import axios from 'axios'

/**图书详情 */
class DetailBook extends React.Component{

    state = {
        data: [],
        selectedRowKeyArr: []
    }
    
    componentWillMount(){
        debugger;
        this.props.onDetailRef(this);
    }

    loadData = () => {
        const _this = this;
        axios.post('/detailBookController/getBookByBookKey',{
            bookKey : _this.props.bookKey,
        }).then(function (response) {
            _this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render(){
        const _this = this;

        const columns = [
            {title: 'key', dataIndex: 'key'},
            {title: '借出状态', dataIndex: 'borrowed', render: function(text, record, index){
                let borrowState = "";
                if(text === '1'){
                    borrowState = "已借出";
                }else if(text === '0'){
                    borrowState = "未借出";
                }
                return borrowState;
                
            }},
            {title: '借阅用户', dataIndex: 'borrowUserKey'},
            {title: '借出时间', dataIndex: 'borrowTime'},
            {title: '应归还时间', dataIndex: 'shouldReturnTime'}
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
            <div>

                <Table
                    pagination = {true}
                    bordered = {true}
                    columns = {columns}
                    dataSource = {this.state.data}
                    rowSelection = {rowSelection}
                >
                </Table>
            </div>
        )
    }
}

export default DetailBook
