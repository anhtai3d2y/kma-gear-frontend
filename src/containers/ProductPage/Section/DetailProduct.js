import React, { Component } from 'react';
import { connect } from 'react-redux';
import PolicyBlock from "./PolicyBlock.js"
import BlockHeaderTitle from "../../HomePage/Section/BlockHeaderTitle.js"
import *  as actions from "../../../store/actions";

import './DetailProduct.scss'


class ProductPage extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        this.handleScroll()
        this.props.fetchProductsById(this.props.productId)
    }

    componentDidUpdate() {
        this.handleScroll()
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    render() {
        console.log('detail product did mount, product by id: ', this.props.productsByIdRedux)
        return (
            <div className="detail-product mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="product-detail-top">
                        <div className="product-detail-top-left">
                            <a href="https://www.tncstore.vn/index.php?route=product/manufacturer/info&amp;manufacturer_id=158"
                                title="Newmen" class="product-brand">
                                <img src="https://www.tncstore.vn/image/catalog/logo new/newmen-logo.jpg" alt="Newmen" />
                            </a>
                            <div className="product-image">
                                <img
                                    src="https://www.tncstore.vn/image/cache/catalog/b%C3%A0n%20ph%C3%ADm%20c%C6%A1/Newmen/GM680/ban-phim-newmen-gm680-brown-500x500.jpg"
                                    data-src="https://www.tncstore.vn/image/cache/catalog/b%C3%A0n%20ph%C3%ADm%20c%C6%A1/Newmen/GM680/ban-phim-newmen-gm680-brown-500x500.jpg"
                                    title="Bàn Phím Bluetooth Newmen Dual mode GM680 BT5.0 -Brown Switch"
                                    alt="Bàn Phím Bluetooth Newmen Dual mode GM680 BT5.0 -Brown Switch"
                                />
                            </div>
                        </div>
                        <div className="product-detail-top-right">
                            <h1>Bàn Phím Bluetooth Newmen Dual mode GM680 BT5.0 -Brown Switch</h1>
                            <div class="rating-guarantee">
                                <div class="product-rate">
                                    <div class="rate-star">
                                        <i class="fas fa-star "></i>
                                        <i class="fas fa-star "></i>
                                        <i class="fas fa-star "></i>
                                        <i class="fas fa-star "></i>
                                        <i class="fas fa-star "></i>
                                    </div>
                                    <div class="rate-text">0 đánh giá</div>
                                </div>
                                <div class="product-guarantee">
                                    <span>Bảo hành 24 Tháng</span>
                                </div>
                            </div>
                            <div id="product" class="status-price">
                                <div class="col1">
                                    <div>
                                        <p class="status-stock">
                                            <span class="status status1">
                                                <i aria-hidden="true" class="fa fa-circle">

                                                </i>Còn hàng
                                            </span>
                                        </p>
                                        <div class="quantity">
                                            Số lượng
                                            <div class="quantity-wrap">
                                                <input type="text" name="quantity" value="0" size="2" />
                                                <div class="qty-action">
                                                    <span title="Thêm" class="add-qty">+</span>
                                                    <span title="Bớt" class="sub-qty">-</span>
                                                </div></div> <input type="hidden" name="product_id" value="6084" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col2">
                                    <ul class="list-unstyled list-price">
                                        <li>
                                            <p class="price-old">1.690.000 đ</p>
                                        </li>
                                        <li>
                                            <p class="price">1.599.000 đ</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="add-cart-buttons">
                                <button type="button" data-loading-text="Đang tải..." class="btn-add-cart btn-add-cart-2">
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <path d="M1.33301 0.833252H4.66634L6.89967 11.9916C6.97588 12.3752 7.1846 12.7199 7.4893 12.9652C7.79399 13.2105 8.17526 13.3407 8.56634 13.3333H16.6663C17.0574 13.3407 17.4387 13.2105 17.7434 12.9652C18.0481 12.7199 18.2568 12.3752 18.333 11.9916L19.6663 4.99992H5.49967" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    Thêm vào giỏ
                                </button>
                                <button type="button" data-loading-text="Đang tải..." class="btn-add-cart ">
                                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <path d="M15.9187 9.83092L15.9187 8.16922L9.33085 8.16922L9.33085 1.58134H7.66915L7.66915 8.16922L1.08127 8.16922L1.08127 9.83092L7.66915 9.83092L7.66915 16.4188H9.33085L9.33085 9.83092L15.9187 9.83092Z" fill="white"></path>
                                    </svg>
                                    Mua hàng
                                </button>
                            </div>
                        </div>
                    </div>
                    <PolicyBlock />
                    <div className="product-detail-bottom">
                        <div className="content-bottom">
                            <BlockHeaderTitle headerTitle="THÔNG TIN SẢN PHẨM" />
                            <div>Description content here {this.props.productId}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        productsByIdRedux: state.product.productsById

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsById: (id) => dispatch(actions.fetchProductsByIdSuccess(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
