import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';

import { withRouter } from 'react-router';


import './InfoCustomerForm.scss'


class InfoCustomerForm extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
        this.state = {
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            isEditCustomerInfo: false,
            isChangePassword: false,
        }
    }

    componentDidMount() {
        // this.handleScroll()
    }

    componentDidUpdate() {
        // this.handleScroll()
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    handleLogout = () => {
        this.props.processCustomerLogout()
        this.props.processClearCartLogout()
    }

    handleChangePassword = () => {
        this.setState({
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            isChangePassword: !this.state.isChangePassword,
            isEditCustomerInfo: false,
        })
    }

    handleEditCustomerInfo = () => {
        this.setState({
            fullName: this.props.customerInfo.fullName,
            email: this.props.customerInfo.email,
            phoneNumber: this.props.customerInfo.phoneNumber,
            address: this.props.customerInfo.address,
            isEditCustomerInfo: !this.state.isEditCustomerInfo,
            isChangePassword: false,
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleSavePassword = async () => {
        let isValid = this.checkValidateInputPassword()
        if (isValid) {
            if (this.state.newPassword === this.state.confirmNewPassword) {
                await this.props.editUserPassword({
                    id: this.props.customerInfo.id,
                    password: this.state.password,
                    newPassword: this.state.newPassword,
                })
            } else {
                toast.error('X??c nh???n m???t kh???u m???i kh??ng tr??ng kh???p!')
            }
        }
    }

    handleSaveCustomerInfo = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            await this.props.editUser({
                id: this.props.customerInfo.id,
                fullName: this.state.fullName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
            })
            toast(`C???p nh???t th??ng tin ${this.state.fullName} th??nh c??ng !`)
            await this.props.fetchUserStart(this.props.customerInfo.id)
            this.setState({
                isEditCustomerInfo: !this.state.isEditCustomerInfo
            })
        }
    }

    checkValidateInputPassword = () => {
        let isValid = true
        let arrInput = ['password', 'newPassword', 'confirmNewPassword']
        let arrMessage = ['m???t kh???u c??', 'm???t kh???u m???i', 'x??c nh???n m???t kh???u m???i']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                toast.error('B???n ch??a nh???p ' + arrMessage[i])
                break
            }
        }
        return isValid
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['fullName', 'email', 'phoneNumber', 'address']
        let arrMessage = ['h??? t??n', 'email', 's??? ??i???n tho???i', '?????a ch???']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                toast.error('B???n ch??a nh???p ' + arrMessage[i])
                break
            }
        }
        return isValid
    }

    render() {
        const { isCustomerLoggedIn, customerInfo } = this.props;
        let linkToRedirect = isCustomerLoggedIn ? '/account' : '/login';

        return (
            <div className="login-form mt-4" ref={this.scrollTop}>
                <Helmet>
                    <title>{customerInfo && customerInfo.fullName}</title>
                </Helmet>
                <Redirect to={linkToRedirect} />
                <div className="container">
                    <div className="login-form-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Th??ng tin t??i kho???n</div>
                            {this.state.isChangePassword ?
                                (<div className="group-info">
                                    <div className="input-group">
                                        <label for="">M???t kh???u c?? <span style={{ color: "red" }}>*</span></label>
                                        <input type="password" placeholder="Nh???p m???t kh???u c??..." className="form-control"
                                            value={this.state.password}
                                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label for="">M???t kh???u m???i <span style={{ color: "red" }}>*</span></label>
                                        <input type="password" placeholder="Nh???p m???t kh???u m???i..." className="form-control"
                                            value={this.state.newPassword}
                                            onChange={(event) => { this.onChangeInput(event, 'newPassword') }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label for="">X??c nh???n m???t kh???u m???i <span style={{ color: "red" }}>*</span></label>
                                        <input type="password" placeholder="X??c nh???n m???t kh???u m???i..." className="form-control"
                                            value={this.state.confirmNewPassword}
                                            onChange={(event) => { this.onChangeInput(event, 'confirmNewPassword') }}
                                        />
                                    </div>
                                    <div className="col-12 pd-4 btn-actions">
                                        <button className="btn btn-primary btn-login" type="submit"
                                            onClick={(e) => { this.handleSavePassword() }}
                                        >L??u</button>
                                        <button className="btn btn-primary btn-back-login" type="submit"
                                            onClick={(e) => { this.handleChangePassword() }}
                                        >H???y</button>
                                    </div>
                                </div>) : (
                                    this.state.isEditCustomerInfo ?
                                        (<div className="group-info">
                                            <div className="input-group">
                                                <label for="">?????a ch??? email <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" placeholder="Nh???p email" className="form-control"
                                                    value={this.state.email}
                                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label for="">H??? t??n qu?? kh??ch <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" placeholder="Nh???p t??n kh??ch h??ng" className="form-control"
                                                    value={this.state.fullName}
                                                    onChange={(event) => { this.onChangeInput(event, 'fullName') }}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label for="">S??? ??i???n tho???i <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" placeholder="Nh???p s??? ??i???n tho???i" className="form-control"
                                                    value={this.state.phoneNumber}
                                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label for="">?????a ch??? th?????ng tr?? <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" placeholder="Nh???p ?????a ch???" className="form-control"
                                                    value={this.state.address}
                                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                                />
                                            </div>
                                            <div className="col-12 pd-4 btn-actions">
                                                <button className="btn btn-primary btn-login" type="submit"
                                                    onClick={(e) => { this.handleSaveCustomerInfo() }}
                                                >L??u</button>
                                                <button className="btn btn-primary btn-back-login" type="submit"
                                                    onClick={(e) => { this.handleEditCustomerInfo() }}
                                                >H???y</button>
                                            </div>
                                        </div>) : (<>
                                            <div className="col-12 form-group login-input">
                                                <label>Email: {customerInfo && customerInfo.email}</label>
                                            </div>
                                            <div className="col-12 form-group login-input">
                                                <label>H??? t??n: {customerInfo && customerInfo.fullName}</label>
                                            </div>
                                            <div className="col-12 form-group login-input">
                                                <label>S??? ??i???n tho???i: {customerInfo && customerInfo.phoneNumber}</label>
                                            </div>
                                            <div className="col-12 form-group login-input">
                                                <label>?????a ch???: {customerInfo && customerInfo.address}</label>
                                            </div>

                                            <div className="col-12" style={{ color: 'red' }}>
                                                {this.state.errMessage}
                                            </div>
                                        </>)
                                )
                            }
                            <div className="col-4 pd-4 btn-actions">
                                <button className="btn btn-primary btn-login" type="submit"
                                    onClick={(e) => { this.handleEditCustomerInfo() }}
                                >S???a th??ng tin</button>
                            </div>
                            <div className="col-4 pd-4 btn-actions">
                                <button className="btn btn-primary btn-login" type="submit"
                                    onClick={(e) => { this.handleChangePassword() }}
                                >?????i m???t kh???u</button>
                            </div>
                            <div className="col-4 pd-4 btn-actions">
                                <button className="btn btn-primary btn-back-login" type="submit"
                                    onClick={(e) => { this.handleLogout() }}
                                >????ng xu???t</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isCustomerLoggedIn: state.customer.isCustomerLoggedIn,
        customerInfo: state.customer.customerInfo,
        cartdetails: state.cartdetail.cartdetails,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        customerLoginSuccess: (customerInfo) => dispatch(actions.customerLoginSuccess(customerInfo)),
        processCustomerLogout: () => dispatch(actions.processCustomerLogout()),
        processClearCartLogout: () => dispatch(actions.processClearCartLogout()),
        fetchUserStart: (id) => dispatch(actions.fetchUserStart(id)),
        editUser: (data) => dispatch(actions.editUser(data)),
        editUserPassword: (data) => dispatch(actions.editUserPassword(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoCustomerForm));
