import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingProduct.scss'
import { changeLanguageApp } from "../../../store/actions";

import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";

import ProductCard from '../../ProductPage/Section/ProductCard.js'

import *  as actions from "../../../store/actions";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/autoplay/autoplay.min.css"


import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

class OutstandingProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProducts: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topProductsRedux !== this.props.topProductsRedux) {
            this.setState({
                arrProducts: this.props.topProductsRedux
            })
        }
    }

    componentDidMount() {
        this.props.fetchTopProductsHomeRedux()
    }


    render() {
        let arrProducts = this.state.arrProducts
        return (
            <div className="container">
                <div className="block-header">
                    <span class="block-header-title">SẢN PHẨM BÁN CHẠY</span>
                </div>
                <div className="outstanding-product">
                    <div className="outstanding-product-content">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                            navigation={true}
                            className="mySwiper"
                        >
                            {arrProducts && arrProducts.length > 0 &&
                                arrProducts.map((product, index) => {
                                    return (
                                        <SwiperSlide>
                                            <ProductCard product={product} />
                                        </SwiperSlide>
                                    )
                                })
                            }

                        </Swiper>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topProductsRedux: state.product.topProducts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchTopProductsHomeRedux: () => dispatch(actions.fetchTopProductsHomeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingProduct);
