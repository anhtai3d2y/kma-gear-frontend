import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeMainBannerSlide.scss'
import { changeLanguageApp } from "../../../store/actions";
import *  as actions from "../../../store/actions";


import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";


import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/autoplay/autoplay.min.css"


import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

class HomeMainBannerSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // mainBanners: []
        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchMainBannersRedux()
        // this.handleScroll()
    }

    render() {
        let arrMainBanners = this.props.mainBannerRedux

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
                        {arrMainBanners && arrMainBanners.length > 0 &&
                            arrMainBanners.map((banner, index) => {
                                return (
                                    <SwiperSlide>
                                        <a href={banner.link}>
                                            <img src={banner.image} />
                                        </a>
                                    </SwiperSlide>
                                )
                            })
                        }
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
        mainBannerRedux: state.banner.mainBanners,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchMainBannersRedux: () => dispatch(actions.fetchMainBannerStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMainBannerSlide);
