import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader'
import HomeBanner from './Banner/HomeBanner'
import Footer from './Footer/Footer'
import ErrorNotFound from './Section/ErrorNotFound'


class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <ErrorNotFound />
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
