import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import { createNewUserService } from "../../../services/userService";
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet'


import { withRouter } from 'react-router';


import './RegisterForm.scss'


class RegisterForm extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            isShowPassword: false,
            isShowConfirmPassword: false,
            errMessage: '',
            successMessage: ''
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

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    handleOnChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value,
        })
    }
    handleOnChangeFullName = (e) => {
        this.setState({
            fullName: e.target.value,
        })
    }
    handleOnChangePhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value,
        })
    }
    handleOnChangeAddress = (e) => {
        this.setState({
            address: e.target.value,
        })
    }

    handleShowHidePassword = (e) => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleShowHideConfirmPassword = (e) => {
        this.setState({
            isShowConfirmPassword: !this.state.isShowConfirmPassword
        })
    }


    handleRegister = async () => {
        this.setState({
            errMessage: '',
            successMessage: ''

        })

        let isValid = this.checkValidateInput()
        if (isValid) {
            let isConfirmPassword = this.checkConfirmPassword()
            if (!isConfirmPassword) {
                this.setState({
                    errMessage: 'M???t kh???u x??c nh???n kh??ng ????ng'
                })
            } else {
                try {
                    console.log('ok')
                    let user = {
                        email: this.state.email,
                        password: this.state.password,
                        fullName: this.state.fullName,
                        phoneNumber: this.state.phoneNumber,
                        address: this.state.address,
                    }
                    let data = await createNewUserService(user)
                    if (data && data.errCode !== 0) {
                        this.setState({
                            errMessage: data.errMessage
                        })
                    }
                    if (data && data.errCode === 0) {
                        this.setState({
                            successMessage: '????ng k?? th??nh c??ng, quay l???i ????ng nh???p'
                        })
                    }
                } catch (error) {
                    if (error.response) {
                        if (error.response.data) {
                            this.setState({
                                errMessage: error.response.data.message
                            })
                        }
                    }
                }
            }
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'confirmPassword', 'fullName', 'phoneNumber', 'address']
        let arrMessage = ['email', 'm???t kh???u', 'm???t kh???u x??c nh???n', 'h??? v?? t??n', 's??? ??i???n tho???i', '?????a ch???']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                this.setState({
                    errMessage: `B???n ch??a nh???p ${arrMessage[i]}`
                })
                return isValid
            }
        }
        return isValid
    }

    checkConfirmPassword = () => {
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword

        return (password === confirmPassword) ? true : false
    }


    handleGoLoginPage = () => {
        this.props.history.push('/login')
    }

    render() {
        const { isCustomerLoggedIn } = this.props;
        let linkToRedirect = isCustomerLoggedIn ? '/account' : '/register';
        return (
            <div className="register-form mt-4" ref={this.scrollTop}>
                <Helmet>
                    <title>????ng k??</title>
                </Helmet>
                <Redirect to={linkToRedirect} />
                <div className="container">
                    <div className="register-form-container">
                        <div className="register-content row">
                            <div className="col-12 text-register">????ng k??</div>
                            <div className="col-12 form-group register-input">
                                <label>Email:</label>
                                <input type="text" className="form-control" placeholder="Nh???p email c???a b???n"
                                    value={this.state.username}
                                    onChange={(e) => this.handleOnChangeEmail(e)}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>M???t kh???u:</label>
                                <div className="custom-input-password">
                                    <input type={this.state.isShowPassword ? "text" : "password"} className="form-control" placeholder="Nh???p m???t kh???u c???a b???n"
                                        value={this.state.password}
                                        onChange={(e) => this.handleOnChangePassword(e)}
                                    />
                                    <span onClick={() => { this.handleShowHidePassword() }}>
                                        <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>Nh???p l???i m???t kh???u:</label>
                                <div className="custom-input-password">
                                    <input type={this.state.isShowConfirmPassword ? "text" : "password"} className="form-control" placeholder="Nh???p m???t kh???u c???a b???n"
                                        value={this.state.confirmPassword}
                                        onChange={(e) => this.handleOnChangeConfirmPassword(e)}
                                    />
                                    <span onClick={() => { this.handleShowHideConfirmPassword() }}>
                                        <i className={this.state.isShowConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>H??? v?? t??n:</label>
                                <input type="text" className="form-control" placeholder="Nh???p h??? t??n c???a b???n"
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnChangeFullName(e)}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>S??? ??i???n tho???i:</label>
                                <input type="text" className="form-control" placeholder="Nh???p s??? ??i???n tho???i c???a b???n"
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangePhoneNumber(e)}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>?????a ch???:</label>
                                <input type="text" className="form-control" placeholder="Nh???p ?????a ch??? c???a b???n"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeAddress(e)}
                                />
                            </div>
                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12" style={{ color: 'green' }}>
                                {this.state.successMessage}
                            </div>
                            <div className="col-12 pd-4 btn-actions">
                                <button className="btn btn-primary btn-back-login" type="submit"
                                    onClick={() => this.handleGoLoginPage()}
                                >Quay l???i ????ng nh???p</button>
                                <button className="btn btn-primary btn-register" type="submit"
                                    onClick={(e) => { this.handleRegister() }}
                                >????ng k??</button>
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">Forgot your password?</span>
                            </div>
                            <div className="col-12">

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
