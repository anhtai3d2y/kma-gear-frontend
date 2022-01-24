import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import DetailCart from './Section/DetailCart.js'
import Footer from '../HomePage/Footer/Footer.js'

import { Helmet } from 'react-helmet'



class CartPage extends Component {

    render() {
        let productId = this.props.match.params.id
        return (
            <div>
                <Helmet>
                    <title>Giỏ hàng</title>
                </Helmet>
                <HomeBanner />
                <HomeHeader />
                <DetailCart />
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
