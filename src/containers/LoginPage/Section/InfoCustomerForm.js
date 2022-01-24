import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router';


import './InfoCustomerForm.scss'


class InfoCustomerForm extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
        this.state = {
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
                            <div className="col-12 text-login">Thông tin tài khoản</div>
                            <div className="col-12 form-group login-input">
                                <label>Email: {customerInfo && customerInfo.email}</label>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Họ tên: {customerInfo && customerInfo.fullName}</label>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Số điện thoại: {customerInfo && customerInfo.phoneNumber}</label>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Địa chỉ: {customerInfo && customerInfo.address}</label>
                            </div>

                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12 pd-4 btn-actions">
                                <button className="btn btn-primary btn-login" type="submit"
                                    onClick={(e) => { this.handleLogout() }}
                                >Đăng xuất</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        customerLoginSuccess: (customerInfo) => dispatch(actions.customerLoginSuccess(customerInfo)),
        customerLoginFail: () => dispatch(actions.customerLoginFail()),
        processCustomerLogout: () => dispatch(actions.processCustomerLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoCustomerForm));
