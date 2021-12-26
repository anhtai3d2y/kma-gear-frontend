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
        // this.props.fetchBillsRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        // if (prevProps.bills !== this.props.bills) {
        //     this.setState({
        //         bills: this.props.bills
        //     })
        // }
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
        let types = this.props.types
        let brands = this.props.brands
        return (
            < div className="bill-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    {/* <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Loại sản phẩm</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Chiết khấu (%)</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrBills && arrBills.length > 0 &&
                            arrBills.map((bill, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{bill.id}</th>
                                        <td>{bill.name}</td>
                                        <td>
                                            <div className="bill-image">
                                                <img src={bill.image} />
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                types.map((type, index) => {
                                                    return (type.id === bill.typeId) ? (type.typeName) : (<div></div>)
                                                })
                                            }
                                        </td>
                                        <td>
                                            {
                                                brands.map((brand, index) => {
                                                    return (brand.id === bill.brandId) ? (brand.name) : (<div></div>)
                                                })
                                            }
                                        </td>
                                        <td>{bill.amount}</td>
                                        <td>{bill.price}</td>
                                        <td>{bill.discount}</td>
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

                    </tbody> */}
                </table>
            </ div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchBillsRedux: () => dispatch(actions.fetchAllBillsStart()),
        // deleteBillRedux: (id) => dispatch(actions.deleteBill(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBill);
