import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";

import './CartItem.scss'


class CartItem extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
    }

    componentDidUpdate() {
        // this.handleScroll()
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
        return (
            <>
                <div className="cart-p-img">
                    <img src="https://www.tncstore.vn/image/cache/catalog/vga/msi/3060_TI_Ventus_3x_OC/card-man-hinh-msi-geforce-rtx-3060-ti-ventus-3x-oc-1-228x228.jpg" alt="Card Màn Hình MSI GeForce RTX 3060 Ti VENTUS 3X OC" />

                </div>
                <div className="cart-p-content">
                    <a href="https://www.tncstore.vn/card-man-hinh-msi-geforce-rtx-3060-ti-ventus-3x-oc.html" target="_blank" class="cart-p-name">Card Màn Hình MSI GeForce RTX 3060 Ti VENTUS 3X OC</a>
                    <div className="cart-p-meta">
                        <div className="cart-p-desc">
                            <div className="collapse">
                                <div className="collapse-header">
                                    <i className="far fa-angle-right"></i>
                                    Chi tiết sản phẩm
                                </div>
                                <div className="collapse-body">
                                    <div className="short-desc">
                                        mô tả ngắn ở đây
                                        <p><span >- Thương hiệu: MSI</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cart-p-price">22.490.000 đ</div>
                    </div>
                    <div className="cart-p-actions">
                        Số lượng
                        <div className="cart-p-qty">
                            <span className="qty-decrease">-</span>
                            <input type="tel" className="qty-input" value={1} />
                            <span className="qty-increase">+</span>
                        </div>
                        <div className="cart-p-remove">
                            <svg width="14" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 5H3.16667H16.5" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M5.66602 4.99984V3.33317C5.66602 2.89114 5.84161 2.46722 6.15417 2.15466C6.46673 1.8421 6.89066 1.6665 7.33268 1.6665H10.666C11.108 1.6665 11.532 1.8421 11.8445 2.15466C12.1571 2.46722 12.3327 2.89114 12.3327 3.33317V4.99984M14.8327 4.99984V16.6665C14.8327 17.1085 14.6571 17.5325 14.3445 17.845C14.032 18.1576 13.608 18.3332 13.166 18.3332H4.83268C4.39065 18.3332 3.96673 18.1576 3.65417 17.845C3.34161 17.5325 3.16602 17.1085 3.16602 16.6665V4.99984H14.8327Z" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M7.33398 9.1665V14.1665" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M10.666 9.1665V14.1665" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            XOÁ
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
