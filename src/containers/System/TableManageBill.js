import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBill.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableManageBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bills: [],
        }
    }

    componentDidMount() {
        this.props.fetchBillsRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.bills !== this.props.billsRedux) {
            this.setState({
                bills: this.props.billsRedux
            })
        }
    }

    handleEditBill = (bill) => {
        // this.props.handleEditBillFromParent(bill)
    }

    handleDeleteBill = async (bill) => {
        // await this.props.deleteBillRedux(bill.id)
        // await this.props.fetchBillsRedux()
    }

    render() {
        let arrBills = this.state.bills
        console.log('arr: ', arrBills)
        return (
            < div className="bill-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Người nhận</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ghi chú</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Phương thức thanh toán</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrBills && arrBills.length > 0 &&
                            arrBills.map((bill, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{bill.id}</th>
                                        <td>{bill.User.fullName}</td>
                                        <td>{bill.fullName}</td>
                                        <td>{bill.email}</td>
                                        <td>{bill.phoneNumber}</td>
                                        <td>{bill.address}</td>
                                        <td>{bill.note}</td>
                                        <td>{bill.State.content}</td>
                                        <td>{(bill.paymentTypeId === 1 ? 'Thanh toán khi nhận' : 'Thanh toán trực tuyến')}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditBill(bill)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteBill(bill)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </ div>
        );
    }

}

const mapStateToProps = state => {
    return {
        billsRedux: state.bill.bills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBillsRedux: () => dispatch(actions.fetchBillStart()),
        // deleteBillRedux: (id) => dispatch(actions.deleteBill(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBill);
