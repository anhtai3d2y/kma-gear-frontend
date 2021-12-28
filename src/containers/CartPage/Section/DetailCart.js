import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";

import CartItem from "./CartItem.js";

import './DetailCart.scss'


class DetailCart extends Component {

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
            <div className="detail-cart mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="cart">
                        <div className="cart-products">
                            <div className="cart-process">

                            </div>
                            <div className="cart-header">

                            </div>

                            <CartItem />

                        </div>
                        <div className="cart-total-prices">
                            <div className="cart-prices">
                                <div class="title">THÔNG TIN GIỎ HÀNG</div>
                                <div>Số lượng sản phẩm <span class="p-count">14</span></div>
                                <div>Tổng chi phí <span class="price">344.460.000 đ</span></div>
                                <div style="font-size: 14px; color: rgb(78, 78, 84); font-weight: normal; justify-content: flex-end;">Đã bao gồm VAT (nếu có)</div>
                                <a href="https://www.tncstore.vn/index.php?route=checkout/checkout" class="go-checkout">Xác nhận đơn hàng</a>
                                <a href="https://www.tncstore.vn/index.php?route=checkout/checkout" class="go-checkout">Xác nhận đơn hàng</a>
                                <a href="https://www.tncstore.vn/">XEM SẢN PHẨM KHÁC</a>
                            </div>
                            <div className="cart-info">
                                <div class="info"><div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Hỗ trợ trả góp 0%, trả trước 0đ
                                </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Hoàn tiền 200% khi phát hiện hàng giả
                                    </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Giao hàng nhanh 3H nội thành Hà Nội
                                    </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Giao hàng từ 5 - 7 ngày toàn quốc
                                    </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Đội ngũ kĩ thuật hỗ trợ online 7/7
                                    </div>
                                </div>
                                <div class="bank">
                                    <a href="">
                                        <img src="catalog/view/theme/default/image/tien-mat.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="catalog/view/theme/default/image/internet-bank.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="catalog/view/theme/default/image/mastercard.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="catalog/view/theme/default/image/visa.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCart);
