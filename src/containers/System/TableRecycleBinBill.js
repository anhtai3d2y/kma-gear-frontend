import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
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

class TableRecycleBinBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedState: -1,
            selectedPaymenttype: -1,
            sortBy: 3,

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
        let arrBills = this.props.billsDeleted
        arrBills = this.selectedState(arrBills)
        arrBills = this.selectedPaymenttype(arrBills)
        arrBills = this.sort(arrBills)

        let arrInvoicedetails = this.props.invoicedetailsRedux
        return (
            < div className="product-container" >
                <select id="input-sort" className="mb-4 ml-4 col-2"
                    onChange={(e) => this.handleChangeSelectedState(e)}
                >

                    <option value="-1">Lo???i s???n ph???m (T???t c???)</option>
                    <option value="1">Ch??a x??c nh???n</option>
                    <option value="2">???? x??c nh???n</option>
                    <option value="3">??ang v???n chuy???n</option>
                    <option value="4">???? thanh to??n</option>
                    <option value="5">Ho??n</option>
                    <option value="6">???? h???y</option>

                </select>
                <select id="input-sort" className="mb-4 ml-2 col-4"
                    onChange={(e) => this.handleChangeSelectedPaymenttype(e)}
                >
                    <option value="-1">Ph????ng th???c thanh to??n (T???t c???)</option>
                    <option value="1">Thanh to??n khi nh???n</option>
                    <option value="2">Thanh to??n tr???c tuy???n</option>

                </select>
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 4 || this.state.sortBy === 5 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('id')}
                            >ID <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('createDate')}
                            >Th???i gian <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 0 || this.state.sortBy === 1 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('date')}
                            >Th???i gian x??a <i className="fas fa-sort"></i></th>
                            <th scope="col">T??n kh??ch h??ng</th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 6 || this.state.sortBy === 7 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('fullName')}
                            >Ng?????i nh???n <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 8 || this.state.sortBy === 9 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('email')}
                            >Email <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 10 || this.state.sortBy === 11 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('phoneNumber')}
                            >S??? ??i???n tho???i <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 12 || this.state.sortBy === 13 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('address')}
                            >?????a ch??? <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 14 || this.state.sortBy === 15 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('note')}
                            >Ghi ch?? <i className="fas fa-sort"></i></th>
                            <th scope="col">Tr???ng th??i</th>
                            <th scope="col">Ph????ng th???c thanh to??n</th>
                            <th scope="col">S???n ph???m</th>
                            <th scope="col">Th??nh ti???n</th>
                            <th scope="col" colspan="2">H??nh ?????ng</th>
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
                                        <td>{this.convertDate(bill.updatedAt)}</td>
                                        <td>{bill.User.fullName}</td>
                                        <td>{bill.fullName}</td>
                                        <td>{bill.email}</td>
                                        <td>{bill.phoneNumber}</td>
                                        <td>{bill.address}</td>
                                        <td>{bill.note}</td>
                                        <td>{bill.State.content}</td>
                                        <td>{bill.PaymenttypeId && bill.PaymenttypeId === 1 ? 'Thanh to??n khi nh???n' : 'Thanh to??n tr???c tuy???n'}</td>
                                        <td>
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>T??n sp</th>
                                                    <th>Gi??</th>
                                                    <th>S??? l?????ng</th>
                                                    <th>Chi???t kh???u</th>
                                                    <th>T???ng</th>
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
                                                                    {this.numberWithCommas(invoicedetail.price)} ??
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.amount}
                                                                </td>
                                                                <td>
                                                                    {invoicedetail.discount}
                                                                </td>
                                                                <td>{this.numberWithCommas(invoicedetail.price * invoicedetail.amount * (1 - invoicedetail.discount / 100))} ??</td>
                                                            </tr>
                                                        ) : (<></>)
                                                    })
                                                }
                                            </tbody>
                                        </td>
                                        <td>{this.numberWithCommas(sumPrice)} ??</td>
                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverBill(bill)}
                                            ><i className="fab fa-trash"></i>Kh??i ph???c</div>
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
