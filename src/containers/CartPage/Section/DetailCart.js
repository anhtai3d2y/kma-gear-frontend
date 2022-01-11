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

    handlePayment = (event) => {
        event.preventDefault()
        // this.props.payWithPaypal()
        window.open('https://www.w3schools.com/jsref/met_win_open.asp')
    }

    render() {
        return (
            <div className="detail-cart mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="cart">
                        <div className="cart-products inline">
                            <div className="cart-process">
                                <div className="process active"><span>1. Chọn sản phẩm</span></div>
                                <div className="process active"><span>2. Xác nhận đơn hàng</span></div>
                                <div className="process"><span>3. Thanh toán</span></div>
                            </div>
                            <div className="cart-header">
                                <div className="title">THÔNG TIN SẢN PHẨM</div>
                            </div>
                            <div className="cart-p-item">
                                <CartItem />
                            </div>

                        </div>
                        <div className="cart-total-prices">
                            <div className="cart-prices">
                                <div className="title">THÔNG TIN GIỎ HÀNG</div>
                                <div>Số lượng sản phẩm <span className="p-count">14</span></div>
                                <div>Tổng chi phí <span className="price">344.460.000 đ</span></div>
                                <div className="text-vat">Đã bao gồm VAT (nếu có)</div>
                                <a href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-9K131186VX518583C" className="go-checkout"
                                    onClick={(event) => { this.handlePayment(event) }}
                                >Xác nhận đơn hàng</a>
                                <a className="go-del">Xóa giỏ hàng</a>
                                <a href="/" className="go-other-product">XEM SẢN PHẨM KHÁC</a>
                            </div>
                            <div className="cart-info">
                                <div className="info"><div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Hỗ trợ trả góp 0%, trả trước 0đ
                                </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Hoàn tiền 200% khi phát hiện hàng giả
                                    </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Giao hàng nhanh 3H nội thành Hà Nội
                                    </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Giao hàng từ 5 - 7 ngày toàn quốc
                                    </div> <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#27AE60"></path> <path d="M7.74909 10.7374L6.01159 8.99993L5.41992 9.58743L7.74909 11.9166L12.7491 6.9166L12.1616 6.3291L7.74909 10.7374Z" fill="white" stroke="white"></path></svg>Đội ngũ kĩ thuật hỗ trợ online 7/7
                                    </div>
                                </div>
                                <div className="bank">
                                    <a href="">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/tien-mat.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/internet-bank.png" alt="" />
                                    </a>
                                    {/* <a href="">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/mastercard.png" alt="" />
                                    </a> */}
                                    <a href="">
                                        <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640708469/kma_gear/kisspng-logo-paypal-vector-graphics-product-computer-icons-5b7705010f2a82.8291480615345267210621_rvzb1x.png" alt="" />
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
        payWithPaypal: () => dispatch(actions.payWithPaypalStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCart);
