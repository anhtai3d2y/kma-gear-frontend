import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeSubBannerSlide.scss'
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

class HomeSubBannerSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // subBanners: []
        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchSubBannersRedux()
        // this.handleScroll()
    }

    render() {

        let arrSubBanners = this.props.subBannerRedux

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
                        {arrSubBanners && arrSubBanners.length > 0 &&
                            arrSubBanners.map((banner, index) => {
                                return (
                                    <SwiperSlide>
                                        <a href={banner.link}>
                                            <img src={banner.image} />
                                        </a>
                                    </SwiperSlide>
                                )
                            })
                        }
                        {/* <SwiperSlide>
                            <a href="">
                                <img src="https://www.tncstore.vn/image/catalog/banner/2021/Slide/WEB%20-%20OFFICIAL%20STORE%202%20-%20ACER.jpg" />
                            </a>
                        </SwiperSlide> */}
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
        subBannerRedux: state.banner.subBanners


    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchSubBannersRedux: () => dispatch(actions.fetchSubBannerStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSubBannerSlide);
