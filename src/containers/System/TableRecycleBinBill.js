import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchBillDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverBill = async (bill) => {
        await this.props.recoverBill(bill.id)
        await this.props.fetchBillDeletedRedux()
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        let arrBills = this.props.billsDeleted
        let arrInvoicedetails = this.props.invoicedetailsRedux

        console.log(arrBills, arrInvoicedetails)
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Thời gian xóa</th>
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
                                        <td>{bill.updatedAt}</td>
                                        <td>{bill.User.fullName}</td>
                                        <td>{bill.fullName}</td>
                                        <td>{bill.email}</td>
                                        <td>{bill.phoneNumber}</td>
                                        <td>{bill.address}</td>
                                        <td>{bill.note}</td>
                                        <td>{bill.State.content}</td>
                                        <td>{bill.PaymenttypeId && bill.PaymenttypeId === 1 ? 'Thanh toán khi nhận' : 'Thanh toán trực tuyến'}</td>
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
                                                                    {this.numberWithCommas(invoicedetail.price)} đ
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.amount}
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.discount}
                                                                </td>
                                                                <td>{this.numberWithCommas(invoicedetail.price * invoicedetail.amount * (1 - invoicedetail.discount / 100))} đ</td>
                                                            </tr>
                                                        ) : (<></>)
                                                    })
                                                }
                                            </tbody>
                                        </td>
                                        <td>{this.numberWithCommas(sumPrice)} đ</td>
                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverBill(bill)}
                                            ><i className="fab fa-trash"></i>Khôi phục</div>
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
        billsDeleted: state.bill.billsDeleted,
        invoicedetailsRedux: state.invoicedetail.invoicedetails,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBillDeletedRedux: () => dispatch(actions.fetchBillDeletedStart()),
        recoverBill: (id) => dispatch(actions.recoverBill(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinBill);
