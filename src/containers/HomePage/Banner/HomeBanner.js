import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss'
class HomeBanner extends Component {

    render() {

        return (
            <div className="banner">
                <div className="">
                    <a href="https://www.tncstore.vn/khuyen-mai-tet-2022" class="banner-home-top">
                        <img src="https://www.tncstore.vn/image/catalog/banner/2022/Thang1/Banner_top_web_tet_2022.jpg" alt="" />
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
