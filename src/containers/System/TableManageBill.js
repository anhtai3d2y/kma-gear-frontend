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
            invoicedetails: []
        }
    }

    componentDidMount() {
        this.props.fetchBillsRedux()
        this.props.fetchInvoicedetailsRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.bills !== this.props.billsRedux) {
            let arrBills = this.props.billsRedux
            this.setState({
                bills: arrBills
            })
        }
        if (prevProps.invoicedetails !== this.props.invoicedetailsRedux) {
            let arrInvoicedetails = this.props.invoicedetailsRedux
            this.setState({
                invoicedetails: arrInvoicedetails
            })
        }
    }

    handleEditBill = (bill) => {
        this.props.handleEditBillFromParent(bill)
    }

    handleDeleteBill = async (bill) => {
        await this.props.deleteBillRedux(bill.id)
        await this.props.fetchBillsRedux()
    }

    render() {
        let arrBills = this.state.bills
        let arrInvoicedetails = this.state.invoicedetails
        console.log('invoicedetail: ', arrInvoicedetails)
        return (
            < div className="bill-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr style={{ textAlign: "center" }}>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Trạng thái sửa</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Người nhận</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ghi chú</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Phương thức thanh toán</th>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Thành tiền</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrBills && arrBills.length > 0 &&
                            arrBills.map((bill, index) => {
                                let sumPrice = 0
                                return (
                                    <tr >
                                        <th scope="row">{bill.id}</th>
                                        <td>{bill.createdAt}</td>
                                        <td><label style={bill.createdAt === bill.updatedAt ? {} : { color: "red" }}>{bill.createdAt === bill.updatedAt ? 'Chưa sửa' : `(Đã sửa) ${bill.updatedAt}`}</label></td>
                                        <td>{bill.User.fullName}</td>
                                        <td>{bill.fullName}</td>
                                        <td>{bill.email}</td>
                                        <td>{bill.phoneNumber}</td>
                                        <td>{bill.address}</td>
                                        <td>{bill.note}</td>
                                        <td>{bill.State.content}</td>
                                        <td>{(bill.paymentTypeId === 1 ? 'Thanh toán khi nhận' : 'Thanh toán trực tuyến')}</td>
                                        <td>
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>Tên sp</th>
                                                    <th>Giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Chiết khấu</th>
                                                    <th>Tổng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    arrInvoicedetails.map((invoicedetail, index) => {
                                                        if (invoicedetail.billId === bill.id)
                                                            sumPrice += invoicedetail.price * invoicedetail.amount * (1 - invoicedetail.discount / 100)
                                                        return (invoicedetail.billId === bill.id) ? (
                                                            <tr>
                                                                <td>
                                                                    {invoicedetail.Product.name}
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.price}
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.amount}
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.discount}
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.price * invoicedetail.amount * (1 - invoicedetail.discount / 100)}
                                                                </td>
                                                            </tr>
                                                        ) : (<></>)
                                                    })
                                                }
                                            </tbody>
                                        </td>
                                        <td>{sumPrice}</td>
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
            </ div >
        );
    }

}

const mapStateToProps = state => {
    return {
        billsRedux: state.bill.bills,
        invoicedetailsRedux: state.invoicedetail.invoicedetails,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInvoicedetailsRedux: () => dispatch(actions.fetchInvoicedetailStart()),
        fetchBillsRedux: () => dispatch(actions.fetchBillStart()),
        deleteBillRedux: (id) => dispatch(actions.deleteBill(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBill);
