import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from './Banner/HomeBanner'
import HomeHeader from './Header/HomeHeader'
import HomeMainBannerSlide from './Section/HomeMainBannerSlide'
import HomeSubBannerSlide from './Section/HomeSubBannerSlide'
import OutstandingProduct from './Section/OutstandingProduct'
import AllBrands from './Section/AllBrands'
import ErrorNotFound from './Section/ErrorNotFound'
import CategoryProductList from '../ProductPage/Section/CategoryProductList'
import DetailCart from '../CartPage/Section/DetailCart'
import Footer from './Footer/Footer'


class HomePage extends Component {


    render() {

        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <HomeMainBannerSlide />
                <HomeSubBannerSlide />
                <ErrorNotFound />
                <div className="container">
                    <OutstandingProduct />
                </div>
                <div className="container">
                    <AllBrands />
                </div>
                <CategoryProductList />
                <DetailCart />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
