import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner'
import HomeHeader from '../HomePage/Header/HomeHeader'
import ErrorNotFound from './Section/ErrorNotFound'
import OutstandingProduct from '../HomePage/Section/OutstandingProduct'
import AllBrands from '../HomePage/Section/AllBrands'
import Footer from '../HomePage/Footer/Footer'

import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router';



class ErrorPage extends Component {


    render() {

        return (
            <div>
                <Helmet>
                    <title>Trang bạn yêu cầu không tồn tại!</title>
                </Helmet>
                <HomeBanner />
                <HomeHeader />
                <ErrorNotFound />
                <div className="container">
                    <OutstandingProduct />
                </div>
                <div className="container">
                    <AllBrands />
                </div>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorPage));
