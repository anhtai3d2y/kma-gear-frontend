import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import InfoItem from "./InfoItem.js";
import { withRouter } from 'react-router';


import './DetailCheckout.scss'


class DetailCheckout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: this.props.cartInfo.fullName,
            email: this.props.cartInfo.email,
            phoneNumber: this.props.cartInfo.phoneNumber,
            address: this.props.cartInfo.address,
            note: this.props.cartInfo.note,

            paypalLink: ''
        }
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState) {
        // this.handleScroll()
        if (prevProps.cartInfo !== this.props.cartInfo) {
            this.setState({
                fullName: this.props.cartInfo.fullName,
                email: this.props.cartInfo.email,
                phoneNumber: this.props.cartInfo.phoneNumber,
                address: this.props.cartInfo.address,
                note: this.props.cartInfo.note,
            })
        }
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    handleCheckout = (event) => {
        event.preventDefault()
        this.props.history.push(`/checkout`)
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    // handlePayment = async (event) => {
    //     event.preventDefault()
    //     await this.props.payWithPaypal()
    //     window.open(this.props.paypalLinkRedux)
    // }

    render() {
        const { cartdetails } = this.props;
        let totalProductsCart = cartdetails.reduce((total, item) => {
            return total + item.amount
        }, 0)
        let totalPriceCart = cartdetails.reduce((total, item) => {
            return total + item.amount * item.Product.price * (100 - item.Product.discount) / 100
        }, 0)
        return (
            <div className="detail-cart mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="cart">
                        <div className="cart-products inline">
                            <div className="cart-process">
                                <div className="process active"><span>1. Chọn sản phẩm</span></div>
                                <div className="process active"><span>2. Xác nhận đơn hàng</span></div>
                                <div className="process active"><span>3. Thanh toán</span></div>
                            </div>
                            <div className="group-info">
                                <div className="title">THÔNG TIN GIAO HÀNG</div>
                                <div className="input-group">
                                    <label for="">Họ tên quý khách <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nhập tên khách hàng" className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => { this.onChangeInput(event, 'fullName') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">Địa chỉ email <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nhập email" className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">Số điện thoại <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nhập số điện thoại" className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">Địa chỉ thường trú <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nhập địa chỉ" className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">Ghi chú </label>
                                    <textarea placeholder="Nhập ghi chú" className="form-control" rows="2"
                                        value={this.state.note}
                                        onChange={(event) => { this.onChangeInput(event, 'note') }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="group-info pay-method">
                                <div className="title">Hình thức thanh toán</div>
                                <div className="input-group">
                                    <input type="radio" value="atSpot" className="input-radio" name="payMethod" />
                                    <label for="">Thanh toán tại nơi giao hàng</label>
                                </div>
                                <div className="input-group">
                                    <input type="radio" value="paypal" className="input-radio" name="payMethod" />
                                    <label for="">Thanh toán qua Paypal</label>
                                </div>
                                <div className="input-group">
                                    <input type="radio" value="bank" className="input-radio" name="payMethod" />
                                    <label for="">Thanh toán qua ngân hàng</label>
                                </div>
                            </div>

                        </div>
                        <div className="cart-total-prices">
                            <div className="cart-prices">
                                <div className="title">THÔNG TIN GIỎ HÀNG</div>
                                <div>Số lượng sản phẩm <span className="p-count">{totalProductsCart}</span></div>
                                <div>Tổng chi phí <span className="price">{this.numberWithCommas(totalPriceCart)} đ</span></div>
                                <div className="text-vat">Đã bao gồm VAT (nếu có)</div>

                                {cartdetails && cartdetails.length > 0 &&
                                    cartdetails.map((product, index) => {
                                        return (
                                            <div className="cart-p-item">
                                                <InfoItem product={product} />
                                            </div>
                                        )
                                    })
                                }
                                <a href="" className="go-checkout"
                                    onClick={(event) => { this.handleCheckout(event) }}
                                >Xác nhận mua hàng</a>
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
        // paypalLinkRedux: state.paypal.paypalLink
        cartInfo: state.cart.carts,
        cartdetails: state.cartdetail.cartdetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // payWithPaypal: () => dispatch(actions.payWithPaypalStart()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCheckout));
