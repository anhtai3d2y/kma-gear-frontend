import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBill.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";
import {
    sortByCreateDateASC,
    sortByCreateDateDESC,
    sortByDateASC,
    sortByDateDESC,
    sortByIdASC,
    sortByIdDESC,
    sortByFullNameASC,
    sortByFullNameDESC,
    sortByEmailASC,
    sortByEmailDESC,
    sortByPhonenumberASC,
    sortByPhonenumberDESC,
    sortByAddressASC,
    sortByAddressDESC,
    sortByNoteASC,
    sortByNoteDESC,
} from '../../utils/SortUtils.js';

class TableManageBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            invoicedetails: [],
            selectedState: -1,
            selectedPaymenttype: -1,
            sortBy: 3,

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

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    handleSortBy = (key) => {
        let keyId
        switch (key) {
            case 'createDate':
                if (this.state.sortBy === 2) {
                    keyId = 3
                } else {
                    keyId = 2
                }
                break;
            case 'date':
                if (this.state.sortBy === 0) {
                    keyId = 1
                } else {
                    keyId = 0
                }
                break;
            case 'id':
                if (this.state.sortBy === 4) {
                    keyId = 5
                } else {
                    keyId = 4
                }
                break;
            case 'fullName':
                if (this.state.sortBy === 6) {
                    keyId = 7
                } else {
                    keyId = 6
                }
                break;
            case 'email':
                if (this.state.sortBy === 8) {
                    keyId = 9
                } else {
                    keyId = 8
                }
                break;
            case 'phoneNumber':
                if (this.state.sortBy === 10) {
                    keyId = 11
                } else {
                    keyId = 10
                }
                break;
            case 'address':
                if (this.state.sortBy === 12) {
                    keyId = 13
                } else {
                    keyId = 12
                }
                break;
            case 'note':
                if (this.state.sortBy === 14) {
                    keyId = 15
                } else {
                    keyId = 14
                }
                break;

            default:
                break;
        }
        this.setState({
            sortBy: keyId
        })
    }

    sort = (arr) => {
        switch (this.state.sortBy) {
            case 0:
                arr.sort(sortByDateASC)
                break;
            case 1:
                arr.sort(sortByDateDESC)
                break;
            case 2:
                arr.sort(sortByCreateDateASC)
                break;
            case 3:
                arr.sort(sortByCreateDateDESC)
                break;
            case 4:
                arr.sort(sortByIdASC)
                break;
            case 5:
                arr.sort(sortByIdDESC)
                break;
            case 6:
                arr.sort(sortByFullNameASC)
                break;
            case 7:
                arr.sort(sortByFullNameDESC)
                break;
            case 8:
                arr.sort(sortByEmailASC)
                break;
            case 9:
                arr.sort(sortByEmailDESC)
                break;
            case 10:
                arr.sort(sortByPhonenumberASC)
                break;
            case 11:
                arr.sort(sortByPhonenumberDESC)
                break;
            case 12:
                arr.sort(sortByAddressASC)
                break;
            case 13:
                arr.sort(sortByAddressDESC)
                break;
            case 14:
                arr.sort(sortByNoteASC)
                break;
            case 15:
                arr.sort(sortByNoteDESC)
                break;

            default:
                break;
        }
        return arr
    }

    handleChangeSelectedState = (e) => {
        this.setState({
            selectedState: Number(e.target.value)
        })
    }

    handleChangeSelectedPaymenttype = (e) => {
        this.setState({
            selectedPaymenttype: Number(e.target.value)
        })
    }

    selectedState = (arr) => {
        if (this.state.selectedState !== -1) {
            let newArr = []
            arr.forEach(value => {
                if (value.StateId === this.state.selectedState) {
                    newArr.push(value)
                }
            })
            arr = newArr
        }
        return arr
    }

    selectedPaymenttype = (arr) => {
        if (this.state.selectedPaymenttype !== -1) {
            let newArr = []
            arr.forEach(value => {
                if (value.PaymenttypeId === this.state.selectedPaymenttype) {
                    newArr.push(value)
                }
            })
            arr = newArr
        }
        return arr
    }

    convertDate = (date) => {
        let newDate = new Date(date)
        newDate = newDate.getDate() +
            "/" + (newDate.getMonth() + 1) +
            "/" + newDate.getFullYear() +
            " " + newDate.getHours() +
            ":" + newDate.getMinutes() +
            ":" + newDate.getSeconds()
        return newDate
    }

    render() {
        let arrBills = this.state.bills
        arrBills = this.selectedState(arrBills)
        arrBills = this.selectedPaymenttype(arrBills)
        arrBills = this.sort(arrBills)

        let arrInvoicedetails = this.state.invoicedetails
        return (
            < div className="bill-container" >
                <select id="input-sort" className="mb-4 ml-4 col-2"
                    onChange={(e) => this.handleChangeSelectedState(e)}
                >

                    <option value="-1">Loại sản phẩm (Tất cả)</option>
                    <option value="1">Chưa xác nhận</option>
                    <option value="2">Đã xác nhận</option>
                    <option value="3">Đang vận chuyển</option>
                    <option value="4">Đã thanh toán</option>
                    <option value="5">Hoàn</option>
                    <option value="6">Đã hủy</option>

                </select>
                <select id="input-sort" className="mb-4 ml-2 col-4"
                    onChange={(e) => this.handleChangeSelectedPaymenttype(e)}
                >
                    <option value="-1">Phương thức thanh toán (Tất cả)</option>
                    <option value="1">Thanh toán khi nhận</option>
                    <option value="2">Thanh toán trực tuyến</option>

                </select>
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr style={{ textAlign: "center" }}>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 4 || this.state.sortBy === 5 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('id')}
                            >ID <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('createDate')}
                            >Thời gian <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 0 || this.state.sortBy === 1 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('date')}
                            >Trạng thái sửa <i className="fas fa-sort"></i></th>
                            <th scope="col">Tên khách hàng </th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 6 || this.state.sortBy === 7 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('fullName')}
                            >Người nhận <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 8 || this.state.sortBy === 9 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('email')}
                            >Email <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 10 || this.state.sortBy === 11 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('phoneNumber')}
                            >Số điện thoại <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 12 || this.state.sortBy === 13 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('address')}
                            >Địa chỉ <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 14 || this.state.sortBy === 15 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('note')}
                            >Ghi chú <i className="fas fa-sort"></i></th>
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
                                        <td>{this.convertDate(bill.createdAt)}</td>
                                        <td><label style={bill.createdAt === bill.updatedAt ? {} : { color: "red" }}>{bill.createdAt === bill.updatedAt ? 'Chưa sửa' : `(Đã sửa) ${this.convertDate(bill.updatedAt)}`}</label></td>
                                        <td>{bill.User.fullName}</td>
                                        <td>{bill.fullName}</td>
                                        <td>{bill.email}</td>
                                        <td>{bill.phoneNumber}</td>
                                        <td>{bill.address}</td>
                                        <td>{bill.note}</td>
                                        <td>{bill.State.content}</td>
                                        <td>{(bill.PaymenttypeId === 1 ? 'Thanh toán khi nhận' : 'Thanh toán trực tuyến')}</td>
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
                                                        if (invoicedetail.BillId === bill.id)
                                                            sumPrice += invoicedetail.price * invoicedetail.amount * (1 - invoicedetail.discount / 100)
                                                        return (invoicedetail.BillId === bill.id) ? (
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
