import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Redirect } from 'react-router-dom';

import *  as actions from "../../../store/actions";
import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router';
import { handleCustomerLogin } from '../../../services/userService';


import './LoginForm.scss'


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
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

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleCustomerLogin(this.state.email, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.customerLoginSuccess(data.user)
                this.props.fetchCartStart(data.user.id)
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

    handleShowHidePassword = (e) => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleGoRegisterPage = () => {
        this.props.history.push('/register')
    }

    render() {
        const { isCustomerLoggedIn } = this.props;
        let linkToRedirect = isCustomerLoggedIn ? '/account' : '/login';

        return (
            <div className="login-form mt-4" ref={this.scrollTop}>
                <Helmet>
                    <title>Đăng nhập</title>
                </Helmet>
                <Redirect to={linkToRedirect} />

                <div className="container">
                    <div className="login-form-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Đăng nhập</div>
                            <div className="col-12 form-group login-input">
                                <label>Email:</label>
                                <input type="text" className="form-control" placeholder="Nhập email của bạn"
                                    value={this.state.username}
                                    onChange={(e) => this.handleOnChangeEmail(e)}
                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Mật khẩu:</label>
                                <div className="custom-input-password">
                                    <input type={this.state.isShowPassword ? "text" : "password"} className="form-control" placeholder="Nhập mật khẩu của bạn"
                                        value={this.state.password}
                                        onChange={(e) => this.handleOnChangePassword(e)}
                                    />
                                    <span onClick={() => { this.handleShowHidePassword() }}>
                                        <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12 pd-4 btn-actions">
                                <button className="btn btn-primary btn-register" type="submit"
                                    onClick={() => this.handleGoRegisterPage()}
                                >Đăng ký</button>
                                <button className="btn btn-primary btn-login" type="submit"
                                    onClick={(e) => { this.handleLogin() }}
                                >Đăng nhập</button>
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
        customerInfo: state.customer.customerInfo,
        cartInfo: state.cart.carts

    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        customerLoginSuccess: (customerInfo) => dispatch(actions.customerLoginSuccess(customerInfo)),
        customerLoginFail: () => dispatch(actions.customerLoginFail()),
        processCustomerLogout: () => dispatch(actions.processCustomerLogout()),
        fetchCartStart: (UserId) => dispatch(actions.fetchCartStart(UserId)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
