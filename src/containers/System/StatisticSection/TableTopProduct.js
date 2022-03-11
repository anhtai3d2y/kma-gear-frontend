import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class TableTopProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    componentDidUpdate() {
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        let statistics = this.props.data.data
        let arrTitle = ['Số lượng', 'Tổng doanh thu']
        let arrAdd = ['', ' đ']
        const columns = [
            {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: arrTitle[this.props.data.type],
                dataIndex: 'total',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.total - b.total,
            },
        ];

        const dataTable = statistics.map(element => ({
            key: '1',
            name: element.name,
            total: this.numberWithCommas(element.total) + arrAdd[this.props.data.type],
        }))


        return (
            <div className="mt-4" >
                <h3 className="m-4">{this.props.data.label}</h3>
                <Table columns={columns} dataSource={dataTable} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTopProduct);
