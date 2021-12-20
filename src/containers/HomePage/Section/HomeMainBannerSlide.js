import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeMainBannerSlide.scss'
import { changeLanguageApp } from "../../../store/actions";

import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";


import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/autoplay/autoplay.min.css"


import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

class HomeMainBannerSlide extends Component {

    render() {

        return (
            <div className="main-banner">
                <div className="main-banner-content">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        pagination={{
                            clickable: true
                        }}
                        navigation={true}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/khuyen-mai-noel-2021">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Thang_12/260995656_1067662734023699_5487542389668896529_n.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/khuyen-mai-gaming-gear">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/thang%2011/Banner%201650x660%20-%203.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Thang_12/Banner_Web_noel_2021.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/thang%2011/Banner%201650x660%20-%202.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/thang%2011/Banner%201650x660%20-%204.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Thang_12/Banner_Web_noel_2021.png" />
                            </a>
                        </SwiperSlide>
                    </Swiper>
                </div>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMainBannerSlide);
