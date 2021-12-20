import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { ToastContainer, toast } from 'react-toastify';



class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            roleId: 1
        }
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
                address: '',
                roleId: 1
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
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
        let arrInput = ['email', 'password', 'fullName', 'phoneNumber', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                toast.error(`Bạn đang để trống ô ${arrInput[i]}`)
                break
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            //call API create user
            this.props.createNewUser(this.state)
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
                        <div className="body-flex">
                            <div className="input-container input-flex">
                                <label>Email</label>
                                <input type="email"
                                    onChange={(e) => { this.handleOnChangeInput(e, 'email') }}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="input-container input-flex">
                                <label>Password</label>
                                <input type="password"
                                    onChange={(e) => { this.handleOnChangeInput(e, 'password') }}
                                    value={this.state.password}
                                />
                            </div>
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
                        onClick={() => { this.handleAddNewUser() }}
                        className="px-3"
                    >
                        Add
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



