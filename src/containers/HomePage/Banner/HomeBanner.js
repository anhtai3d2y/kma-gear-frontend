import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss'
class HomeBanner extends Component {

    render() {

        return (
            <div className="banner">
                <div className="">
                    <a href="/" class="banner-home-top">
                        <img src="https://www.tncstore.vn/image/catalog/banner/2022/Thang3/Banner%20top%20web.jpg" alt="" />
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
