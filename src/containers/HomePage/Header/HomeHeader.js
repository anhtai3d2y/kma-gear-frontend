import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import *  as actions from "../../../store/actions";
import { withRouter } from 'react-router';



class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // mainBanners: []
        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchCategorysRedux()
        this.props.fetchProducttypesRedux()
        // this.handleScroll()
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    handleGoHomePage = () => {
        this.props.history.push(`/home`)
    }

    handleGoLoginPage = () => {
        this.props.history.push(`/login`)
    }

    handleGoCartPage = () => {
        this.props.history.push(`/cart`)
    }

    handleViewListProduct = (typeProduct) => {
        this.props.history.push(`/list-product/${typeProduct.id}`)
    }

    render() {

        let arrCategorys = this.props.categorysRedux
        let arrProducttypes = this.props.producttypesRedux
        let language = this.props.language

        let isCustomerLoggedIn = this.props.isCustomerLoggedIn
        let customerInfo = this.props.customerInfo

        return (
            <div className="header">
                <div className="header-top">
                    <div className="container">
                        <span>Hotline : (093) 206.2682 - (093) 206.2686 • Email: cskh@kmagear.vn </span>
                    </div>
                </div>
                <div className="header-main">
                    <div className="container">
                        <div className="header-logo">
                            <div style={{ cursor: "pointer" }} onClick={() => { this.handleGoHomePage() }}>
                                <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640407614/kma_gear/kma-gear-logo_jqoxgm.png" alt />
                            </div>
                        </div>

                        <form id="form-search" action="" method="">
                            <input type="hidden" name="route" value="product/search" />
                            <div className="search-box">
                                <div className="search-box-keyword">
                                    <input type="text" name="search" autocomplete="off" placeholder="Nhập sản phẩm cần tìm ..." />
                                </div>
                                <div className="search-box-select">
                                    {/* <input type="hidden" name="category_id" value="0" /> */}
                                    {/* <div className="search-box-select-title">
                                        <FormattedMessage id="homeheader.allcategory" />
                                    </div> */}
                                    {/* <div className="search-box-select-content">
                                    </div> */}
                                    <img src="https://www.tncstore.vn/catalog/view/theme/default/image/search-icon.svg" alt="" className="search-box-icon" />
                                </div>
                            </div>
                        </form>

                        <div className="header-login" onClick={() => { this.handleGoLoginPage() }}>
                            <i class="far fa-user header-login-icon"></i>
                            <span className="header-login-title">{customerInfo && customerInfo.fullName ? customerInfo.fullName : 'Đăng nhập'}</span>
                        </div>
                        <div className="header-cart" onClick={() => { this.handleGoCartPage() }}>
                            <img src="https://www.tncstore.vn/catalog/view/theme/default/image/cart-icon.svg" alt="" className="head-cart-icon" />
                            <span className="head-cart-amount">2</span>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container">
                        <div className="header-bottom-left">
                            <div className="header-bottom-item">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="computer-icon">
                                    <path d="M19.6445 10.2915C19.6147 10.188 19.5525 10.0966 19.4671 10.0307C18.7419 9.47168 17.9973 9.16426 17.2593 9.09492C17.2593 9.09492 17.161 9.0791 16.9243 9.0791C16.6874 9.0791 16.5667 9.09451 16.5667 9.09451C15.8551 9.17843 15.1425 9.49178 14.4433 10.0307C14.3578 10.0965 14.2957 10.188 14.2659 10.2915C13.9227 11.4812 13.8312 12.6224 13.9776 13.883C14.107 14.9974 14.4141 16.1159 14.7723 17.3576C14.8021 17.4612 14.8643 17.5526 14.9496 17.6184C15.4987 18.0418 16.2109 18.2747 16.9551 18.2747C17.6992 18.2747 18.4116 18.0418 18.9607 17.6185C19.0461 17.5527 19.1082 17.4612 19.1381 17.3577C19.4963 16.1158 19.8034 14.9974 19.9328 13.8831C20.0792 12.6224 19.9877 11.4811 19.6445 10.2915ZM17.3983 12.3574C17.3983 12.6022 17.1998 12.8006 16.9551 12.8006C16.7103 12.8006 16.512 12.6022 16.512 12.3574V10.5091C16.512 10.2644 16.7103 10.0659 16.9551 10.0659C17.1998 10.0659 17.3983 10.2644 17.3983 10.5091V12.3574Z" fill="#29324E"></path>
                                    <path d="M13.583 17.0868H12.7839L12.1244 14.8446H13.4705C13.4284 14.6043 13.3925 14.3641 13.3644 14.123C13.2795 13.3916 13.2692 12.6969 13.3347 12.0111H1.5456V2.12031H17.5168V8.46947C18.0371 8.52166 18.5539 8.67359 19.0624 8.92259V1.34751C19.0624 0.920715 18.7163 0.574707 18.2896 0.574707H0.772799C0.346008 0.574707 0 0.920715 0 1.34751V14.0718C0 14.4987 0.346008 14.8446 0.772799 14.8446H6.93788L6.27848 17.0868H5.47951C5.27662 17.0868 5.11212 17.2513 5.11212 17.4542V18.0583C5.11212 18.2612 5.27662 18.4257 5.47951 18.4257H13.583C13.7859 18.4257 13.9503 18.2612 13.9503 18.0583V17.4542C13.9502 17.2513 13.7858 17.0868 13.583 17.0868Z" fill="#29324E"></path>
                                </svg>
                                <span className="text"><FormattedMessage id="homeheader.productportfolio" /></span>
                                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="dropdown-icon">
                                    <path d="M13.2 1.89843L11.649 0.300049L6.59995 5.49195L1.55095 0.300049L-4.95911e-05 1.89843L6.59995 8.70005L13.2 1.89843Z" fill="#29324E"></path>
                                </svg>

                                <ul className="mega-menu">
                                    {arrCategorys && arrCategorys.length > 0 &&
                                        arrCategorys.map((category, index) => {
                                            return (
                                                <>
                                                    <li className="mega-menu-item">
                                                        <div className="mega-menu-category">{category.name}<i className="fas fa-angle-right"></i>

                                                            <ul className="mega-sub-menu">
                                                                <h4>
                                                                    <a href="https://www.tncstore.vn/xay-dung-cau-hinh-pc.html">{category.name}</a>
                                                                </h4>
                                                                {
                                                                    arrProducttypes.map((type, index) => {
                                                                        return (type.categoryId === category.id) ? (
                                                                            <li className="mega-menu-sub-item">
                                                                                <div className="mega-menu-sub-link"
                                                                                    onClick={() => this.handleViewListProduct(type)}
                                                                                >{type.typeName}</div>
                                                                            </li>
                                                                        ) : (<></>)
                                                                    })
                                                                }
                                                                <div className="mega-menu-sub-item-img">
                                                                    <div className="after-img"></div>
                                                                    <img src={category.image} />
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </li>

                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="header-bottom-right">
                            <div className="choose-language">
                                <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                </div>
                                <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                                </div>
                            </div>

                            <a href="https://www.facebook.com/27112k/" target="_blank">
                                <img src="https://www.tncstore.vn/catalog/view/theme/default/image/fb-icon.svg" />
                            </a>
                            <a href="https://www.youtube.com/" target="_blank">
                                <img src="https://www.tncstore.vn/catalog/view/theme/default/image/yt-icon.svg" />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank">
                                <img src="https://www.tncstore.vn/catalog/view/theme/default/image/instagram-icon.svg   " />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        categorysRedux: state.category.categorys,
        producttypesRedux: state.producttype.types,
        isCustomerLoggedIn: state.customer.isCustomerLoggedIn,
        customerInfo: state.customer.customerInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        fetchProducttypesRedux: () => dispatch(actions.fetchProducttypeStart()),
        customerLoginSuccess: (customerInfo) => dispatch(actions.customerLoginSuccess(customerInfo)),
        customerLoginFail: () => dispatch(actions.customerLoginFail()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
