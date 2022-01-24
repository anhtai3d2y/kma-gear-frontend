import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import RegisterForm from './Section/RegisterForm.js'
import Footer from '../HomePage/Footer/Footer.js'

import { Helmet } from 'react-helmet'


class RegisterPage extends Component {


    render() {
        return (
            <div>
                <Helmet>
                    <title>Đăng ký</title>
                </Helmet>
                <HomeBanner />
                <HomeHeader />
                <RegisterForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
