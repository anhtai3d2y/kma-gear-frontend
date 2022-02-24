import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';
import CartItem from "../../CartPage/Section/CartItem.js";

import { withRouter } from 'react-router';


import './InfoCustomerForm.scss'


class InfoBillForm extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
        this.state = {
            isOpenTableBills: false
        }
    }

    componentDidMount() {
        // this.handleScroll()
    }

    componentDidUpdate() {
        // this.handleScroll()
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    handleOpenTableBills = async () => {
        if (!this.state.isOpenTableBills) {
            await this.props.fetchBillByCustomerStart(this.props.customerInfo.id)
            await this.props.fetchInvoicedetailStart()
        }
        this.setState({
            isOpenTableBills: !this.state.isOpenTableBills
        })
    }

    handleCancelBill = async (bill) => {
        await this.props.editBill({
            ...bill,
            StateId: 6
        })
        await this.props.fetchBillByCustomerStart(this.props.customerInfo.id)

    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        const { billsByCustomer, invoicedetails } = this.props;
        let arrBills = billsByCustomer
        let arrInvoicedetails = invoicedetails
        return (
            <div className="login-form mt-4 " ref={this.scrollTop}>
                <div className="login-form-container" style={{ height: "auto" }}>
                    <div className="login-content row">
                        <div className="col-12 text-login" style={{ cursor: "pointer" }}
                            onClick={() => this.handleOpenTableBills()}
                        >Thông tin đơn hàng</div>
                    </div>
                </div>
                {this.state.isOpenTableBills ?
                    (
                        <table className="table table-hover table table-bordered table-striped mb-0">
                            <thead className="">
                                <tr style={{ textAlign: "center" }}>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Tên người nhận</th>
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
                                                <td>{bill.createdAt}</td>
                                                <td>{bill.fullName}</td>
                                                <td>{bill.email}</td>
                                                <td>{bill.phoneNumber}</td>
                                                <td>{bill.address}</td>
                                                <td>{bill.note}</td>
                                                <td style={bill.StateId === 6 ? ({ color: "red" }) : ({ color: "black" })}>{bill.State.content}</td>
                                                <td>{(bill.PaymenttypeId === 1 ? 'Thanh toán khi nhận' : 'Thanh toán trực tuyến')}</td>
                                                <td>
                                                    {
                                                        arrInvoicedetails.map((invoicedetail, index) => {
                                                            if (invoicedetail.BillId === bill.id)
                                                                sumPrice += invoicedetail.price * invoicedetail.amount * (1 - invoicedetail.discount / 100)
                                                            return (invoicedetail.BillId === bill.id) ? (
                                                                <div className="cart-p-item">
                                                                    <CartItem product={invoicedetail} isInBill={true} />
                                                                </div>
                                                            ) : (<></>)
                                                        })
                                                    }

                                                </td>
                                                <td>{this.numberWithCommas(sumPrice)} đ</td>
                                                <td>
                                                    <button className="btn-delete"
                                                        onClick={() => this.handleCancelBill(bill)}
                                                        disabled={(bill.StateId === 1) ? (false) : (true)}
                                                    ><i className="fas fa-trash"> Hủy</i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <div className="container" style={{ textAlign: "center" }}></div>
                    )}

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isCustomerLoggedIn: state.customer.isCustomerLoggedIn,
        customerInfo: state.customer.customerInfo,
        billsByCustomer: state.bill.billsByCustomer,
        invoicedetails: state.invoicedetail.invoicedetails,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        customerLoginSuccess: (customerInfo) => dispatch(actions.customerLoginSuccess(customerInfo)),
        processCustomerLogout: () => dispatch(actions.processCustomerLogout()),
        fetchUserStart: (id) => dispatch(actions.fetchUserStart(id)),
        editUser: (data) => dispatch(actions.editUser(data)),
        editBill: (data) => dispatch(actions.editBill(data)),
        editUserPassword: (data) => dispatch(actions.editUserPassword(data)),
        fetchBillByCustomerStart: (id) => dispatch(actions.fetchBillByCustomerStart(id)),
        fetchInvoicedetailStart: () => dispatch(actions.fetchInvoicedetailStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoBillForm));
