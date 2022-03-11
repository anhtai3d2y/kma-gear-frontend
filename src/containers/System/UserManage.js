import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import TableRecycleBinUser from "./TableRecycleBinUser";
import *  as actions from "../../store/actions";

import { emitter } from "../../utils/emitter";
import { ToastContainer, toast } from 'react-toastify';
import { debounce } from 'lodash';
import {
    sortByCreateDateDESC,
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
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            isOpenRecycleBin: false,

            searchInfo: '',

            sortBy: 1,

        }
    }

    async componentDidMount() {
        await this.props.fetchAllUsersRedux()
        this.setState({
            arrUsers: this.props.users
        })
    }

    componentDidUpdate(prevState, prevProps) {
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                toast.error('Email đã tồn tại, hãy thử một email khác!')
                // alert(response.errMessage)
            } else {
                await this.props.fetchAllUsersRedux()
                this.setState({
                    isOpenModalUser: false
                })
                toast('Thêm người dùng thành công!')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
                // if you want to send data
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id)
            if (response && response.errCode === 0) {
                await this.props.fetchAllUsersRedux()
                toast(`Xóa thành công ${user.fullName}`)
            } else {
                alert(response.errMessage)
                toast.error('Xóa thất bại')
            }
        } catch (error) {
            console.log(error)
        }
    }

    hadleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    editUser = async (user) => {
        try {
            let response = await editUserService(user)
            if (response && response.errCode === 0) {
                await this.props.fetchAllUsersRedux()
                this.setState({
                    isOpenModalEditUser: false
                })
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleOpenRecycleBin = () => {
        this.setState({
            isOpenRecycleBin: !this.state.isOpenRecycleBin
        })
        this.props.fetchAllUsersRedux()
    }

    handleChangeSearchBox = (value) => {
        this.setState({
            searchInfo: value
        })
        if (value !== "") {
            this.handleSearchUsers(value)
        } else {
            this.props.fetchAllUsersRedux()
        }
    }

    handleSearchUsers = debounce((value) => {
        this.props.fetchSearchUserRedux(value)
    }, 100)


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
            case 1:
                arr.sort(sortByCreateDateDESC)
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
        let arrUsers = this.props.users
        arrUsers = this.sort(arrUsers)

        return (
            < div className="user-container" >
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleUserEditModal={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />}
                <div className="title text-center">
                    Quản lý khách hàng
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={(e) => { this.handleAddNewUser() }}
                    ><i className="fas fa-plus"></i>Add a new user</button>
                </div>
                <div className="mb-4 ml-4 col-6 btn-go-recyclebin"
                    onClick={() => { this.handleOpenRecycleBin() }}>{this.state.isOpenRecycleBin ? (<div><i i className="fas fa-caret-left"></i> Quay lại</div>) : (<div><i className="fas fa-trash"></i> Thùng rác</div>)}
                </div>
                <input type="text" className="mb-4 ml-4 col-6" name="search" autocomplete="off" placeholder="Nhập thông tin người dùng cần tìm ..."
                    value={this.state.searchInfo}
                    onChange={(e) => this.handleChangeSearchBox(e.target.value)}
                />
                {this.state.isOpenRecycleBin ?
                    (<TableRecycleBinUser
                        action={this.state.action}
                    />) :
                    (<div className="users-table mt-4 mx-3 table-wrapper-scroll-y my-custom-scrollbar">
                        <table className="table table-hover table table-bordered table-striped mb-0">
                            <thead className="">
                                <tr>
                                    <th scope="col"
                                        style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                        onClick={() => this.handleSortBy('id')}
                                    >ID <i className="fas fa-sort"></i></th>
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
                                {arrUsers && arrUsers.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <th scope="row">{user.id}</th>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => { this.hadleEditUser(user) }}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={() => { this.handleDeleteUser(user) }}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>)}
            </ div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.user.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchSearchUserRedux: (key) => dispatch(actions.fetchSearchUserStart(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
