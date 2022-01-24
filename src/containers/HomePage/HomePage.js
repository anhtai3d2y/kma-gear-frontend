import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from './Banner/HomeBanner'
import HomeHeader from './Header/HomeHeader'
import HomeMainBannerSlide from './Section/HomeMainBannerSlide'
import HomeSubBannerSlide from './Section/HomeSubBannerSlide'
import OutstandingProduct from './Section/OutstandingProduct'
import AllBrands from './Section/AllBrands'
import CategoryProductList from '../ProductPage/Section/CategoryProductList'
import Footer from './Footer/Footer'

import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router';



class HomePage extends Component {


    render() {

        return (
            <div>
                <Helmet>
                    <title>KMA Gear</title>
                </Helmet>
                <HomeBanner />
                <HomeHeader />
                <HomeMainBannerSlide />
                <HomeSubBannerSlide />
                <OutstandingProduct />
                <AllBrands />
                {/* <CategoryProductList /> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
