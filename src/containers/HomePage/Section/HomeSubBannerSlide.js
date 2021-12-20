import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeSubBannerSlide.scss'
import { changeLanguageApp } from "../../../store/actions";

import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";


import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/autoplay/autoplay.min.css"


import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

class HomeSubBannerSlide extends Component {

    render() {

        return (
            <div className="sub-banner">
                <div className="sub-banner-content">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        slidesPerGroup={2}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                        }}
                        pagination={{
                            clickable: true
                        }}
                        navigation={true}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Slide/WEB%20-%20OFFICIAL%20STORE%202%20-%20ACER.jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2020/web-official-store-msi%20(1).jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2020/web-official-store-2%20(1).jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Thang%201/WEB%20-%20OFFICIAL%20STORE%202%20-%20LG.jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/thang%2011/WEB%20-%20OFFICIAL%20STORE%202%20-%20VIEWSONIC.jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Th%C3%A1ng%204/nzxt-store-2.jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Slide/WEB%20-%20OFFICIAL%20STORE%202%20-%20ACER.jpg" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/thang%2011/WEB%20-%20OFFICIAL%20STORE%202%20-%20VIEWSONIC.jpg" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSubBannerSlide);
