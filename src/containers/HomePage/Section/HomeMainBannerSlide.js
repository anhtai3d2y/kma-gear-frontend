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
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640508778/kma_gear/j74rlnxue7jnjfkzyj6f.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/khuyen-mai-gaming-gear">
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640508824/kma_gear/2_yjiysg.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640508829/kma_gear/3_ndobek.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640508829/kma_gear/4_z2ltwt.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640508829/kma_gear/5_euedpl.png" />
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="https://www.tncstore.vn/gaming-pc.html">
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640508828/kma_gear/6_qapoo9.png" />
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
