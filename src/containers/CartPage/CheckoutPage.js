import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import DetailCheckout from './Section/DetailCheckout.js'
import Footer from '../HomePage/Footer/Footer.js'


class CheckoutPage extends Component {

    render() {
        let productId = this.props.match.params.id
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <DetailCheckout />
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
