import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import InfoCustomerForm from './Section/InfoCustomerForm.js'
import InfoBillForm from './Section/InfoBillForm.js'
import Footer from '../HomePage/Footer/Footer.js'

import { withRouter } from 'react-router';


class InfoCustomerPage extends Component {



    render() {
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <InfoCustomerForm />
                <InfoBillForm />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoCustomerPage));
