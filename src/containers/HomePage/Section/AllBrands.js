import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AllBrands.scss'
import { changeLanguageApp } from "../../../store/actions";

import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";

import ProductCard from '../../ProductPage/Section/ProductCard.js'
import BlockHeaderTitle from './BlockHeaderTitle.js'
import { withRouter } from 'react-router';

import *  as actions from "../../../store/actions";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/autoplay/autoplay.min.css"


import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

class AllBrands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBrands: []
        }
    }

    componentDidMount() {
        this.props.fetchBrandRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.brandsRedux !== this.props.brandsRedux) {
            this.setState({
                arrBrands: this.props.brandsRedux
            })
        }
    }

    handleGoProductPage = (id) => {
        this.props.history.push(`/list-product-brand/${id}`)
    }

    render() {
        let arrBrands = this.state.arrBrands
        return (
            <div className="container">
                <BlockHeaderTitle headerTitle="CÁC THƯƠNG HIỆU" />
                <div className="all-brand">
                    <div className="all-brand-content">
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: true
                            }}
                            // navigation={true}
                            className="mySwiper"
                        >
                            {arrBrands && arrBrands.length > 0 &&
                                arrBrands.map((brand, index) => {
                                    return (
                                        <SwiperSlide>
                                            <div className="brand-img" style={{ cursor: "pointer" }}
                                                onClick={() => this.handleGoProductPage(brand.id)}
                                            >
                                                <img src={brand.image} />
                                                <div>{brand.name}</div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div >

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        brandsRedux: state.brand.brands
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchBrandRedux: () => dispatch(actions.fetchBrandStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllBrands));
