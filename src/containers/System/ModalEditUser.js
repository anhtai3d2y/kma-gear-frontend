import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import { toast } from 'react-toastify';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            fullName: '',
            phoneNumber: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleUserEditModal()
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'fullName', 'phoneNumber', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                toast.error('Bạn đang bỏ trống ô: ' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            //call API edit user
            this.props.editUser(this.state)
            toast(`Cập nhật thông tin ${this.state.fullName} thành công !`)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                onChange={(e) => { this.handleOnChangeInput(e, 'fullName') }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="body-flex">
                            <div className="input-container">
                                <label>Full name</label>
                                <input type="text"
                                    onChange={(e) => { this.handleOnChangeInput(e, 'fullName') }}
                                    value={this.state.fullName}
                                />
                            </div>
                            <div className="input-container">
                                <label>Phone number</label>
                                <input type="text"
                                    onChange={(e) => { this.handleOnChangeInput(e, 'phoneNumber') }}
                                    value={this.state.phoneNumber}
                                />
                            </div>
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input type="text"
                                onChange={(e) => { this.handleOnChangeInput(e, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}
                        className="px-3"
                    >
                        Save
                    </Button>
                    {' '}
                    <Button
                        onClick={() => { this.toggle() }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



