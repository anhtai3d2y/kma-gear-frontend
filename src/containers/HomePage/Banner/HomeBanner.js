import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss'
class HomeBanner extends Component {

    render() {

        return (
            <div className="banner">
                <div className="container">
                    <a href="https://www.tncstore.vn/khuyen-mai-tncstore.html" class="banner-home-top">
                        <img src="https://www.tncstore.vn/image/catalog/banner/2021/Th%C3%A1ng%204/TOP%20BANNER.jpg" alt="" />

                    </a>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
