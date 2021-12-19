import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {

            })
        }
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
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })

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
                await this.getAllUsersFromReact()
            } else {
                alert(response.errMessage)
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
                await this.getAllUsersFromReact()
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


    render() {

        let arrUsers = this.state.arrUsers


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
                    Manage user with Tai
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={(e) => { this.handleAddNewUser() }}
                    ><i className="fas fa-plus"></i>Add a new user</button>
                </div>
                <div className="users-table mt-4 mx-3 table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-hover table table-bordered table-striped mb-0">
                        <thead className="">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Address</th>
                                <th scope="col" colspan="2">Actions</th>
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
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
