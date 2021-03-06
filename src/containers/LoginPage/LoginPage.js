import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import LoginForm from './Section/LoginForm.js'
import Footer from '../HomePage/Footer/Footer.js'

import { withRouter } from 'react-router';


class LoginPage extends Component {



    render() {
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <LoginForm />
                <Footer />
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
