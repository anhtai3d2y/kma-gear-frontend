import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingProduct.scss'
import { changeLanguageApp } from "../../../store/actions";

import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

class OutstandingProduct extends Component {
    render() {
        let title = this.props.headerTitle
        return (
            <div className="block-header mt-4">
                <span class="block-header-title">{title}</span>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingProduct);
