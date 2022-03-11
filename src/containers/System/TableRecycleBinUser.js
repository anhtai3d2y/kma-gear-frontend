import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";
import {
    sortByDateASC,
    sortByDateDESC,
    sortByIdASC,
    sortByIdDESC,
    sortByEmailASC,
    sortByEmailDESC,
    sortByFullNameASC,
    sortByFullNameDESC,
    sortByPhonenumberASC,
    sortByPhonenumberDESC,
    sortByAddressASC,
    sortByAddressDESC,
} from '../../utils/SortUtils.js';

class TableRecycleBinUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchUserDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverUser = async (user) => {
        await this.props.recoverUser(user.id)
        await this.props.fetchUserDeletedRedux()
    }

    handleSortBy = (key) => {
        let keyId
        switch (key) {
            case 'id':
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
            case 'email':
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
            case 'phoneNumber':
                if (this.state.sortBy === 8) {
                    keyId = 9
                } else {
                    keyId = 8
                }
                break;
            case 'address':
                if (this.state.sortBy === 10) {
                    keyId = 11
                } else {
                    keyId = 10
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
                arr.sort(sortByIdASC)
                break;
            case 3:
                arr.sort(sortByIdDESC)
                break;
            case 4:
                arr.sort(sortByEmailASC)
                break;
            case 5:
                arr.sort(sortByEmailDESC)
                break;
            case 6:
                arr.sort(sortByFullNameASC)
                break;
            case 7:
                arr.sort(sortByFullNameDESC)
                break;
            case 8:
                arr.sort(sortByPhonenumberASC)
                break;
            case 9:
                arr.sort(sortByPhonenumberDESC)
                break;
            case 10:
                arr.sort(sortByAddressASC)
                break;
            case 11:
                arr.sort(sortByAddressDESC)
                break;

            default:
                break;
        }
        return arr
    }

    render() {
        let arrUsers = this.props.usersDeleted
        arrUsers = this.sort(arrUsers)
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('id')}
                            >ID <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 0 || this.state.sortBy === 1 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('date')}
                            >Thời gian xóa <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 4 || this.state.sortBy === 5 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('email')}
                            >Email <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 6 || this.state.sortBy === 7 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('fullName')}
                            >Full Name <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 8 || this.state.sortBy === 9 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('phoneNumber')}
                            >Phone Number <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 10 || this.state.sortBy === 11 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('address')}
                            >Address <i className="fas fa-sort"></i></th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((user, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{user.id}</th>
                                        <td>{user.updatedAt}</td>
                                        <td>{user.email}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverUser(user)}
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
        usersDeleted: state.user.usersDeleted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserDeletedRedux: () => dispatch(actions.fetchUserDeletedStart()),
        recoverUser: (id) => dispatch(actions.recoverUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinUser);
