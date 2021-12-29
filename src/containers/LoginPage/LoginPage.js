import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import Footer from '../HomePage/Footer/Footer.js'

import { withRouter } from 'react-router';


class LoginPage extends Component {

    handleGoRegisterPage = () => {
        this.props.history.push('/register')
    }

    render() {
        let productId = this.props.match.params.id
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <div>This is login page</div>
                <div onClick={() => this.handleGoRegisterPage()}>Go register page</div>
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
