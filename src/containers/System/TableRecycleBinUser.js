import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        let arrUsers = this.props.usersDeleted
        console.log(arrUsers)
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian xóa</th>
                            <th scope="col">Email</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
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
