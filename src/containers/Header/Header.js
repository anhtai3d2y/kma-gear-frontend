import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    render() {
        const { processUserLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}

                <div className="btn btn-logout" onClick={processUserLogout} title="Logout">
                    <span className="welcome-user">Hello, {userInfo && userInfo.fullName ? userInfo.fullName : ''}</span>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processUserLogout: () => dispatch(actions.processUserLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
