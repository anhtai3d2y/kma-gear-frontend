import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductCard.scss'
import { changeLanguageApp } from "../../../store/actions";
import *  as actions from "../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router';


class ProductCard extends Component {

    handleViewDetailProduct = (product) => {
        this.props.history.push(`/product/${product.id}`)
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    handleAddToCard = async (product, cartdetails) => {
        let { isExisted, cartdetail } = this.checkExistedProduct(product, cartdetails)
        let amountAddToCart = 1
        let amount
        if (isExisted) {
            amount = product.amount - cartdetail.amount
            if (amountAddToCart <= amount) {
                await this.props.editCartdetail({
                    id: cartdetail.id,
                    amount: 1 + cartdetail.amount,
                })
            } else {
                toast(`Bạn đã thêm hết số lượng của sản phẩm.`)
            }
            await this.props.fetchCartdetailStart(this.props.cartInfo.id)
        } else {
            amount = product.amount
            if (amountAddToCart <= amount) {
                let newCartdetail = {
                    CartId: this.props.cartInfo.id,
                    ProductId: product.id,
                    price: product.price,
                    amount: 1,
                    discount: product.discount,
                }
                await this.props.createNewCartdetail(newCartdetail)
                await this.props.fetchCartdetailStart(this.props.cartInfo.id)
            }
        }
    }

    checkExistedProduct = (product, cartdetails) => {
        let existed = {
            isExisted: false,
            cartdetail: {}
        }
        for (let i = 0; i < cartdetails.length; i++) {
            if (product.id === cartdetails[i].ProductId) {
                existed = {
                    isExisted: true,
                    cartdetail: cartdetails[i]
                }
                break
            }
        }
        return existed
    }

    render() {
        let product = this.props.product
        const { cartdetails } = this.props

        return (
            <div className="product">
                <div className="percent">
                    <span>
                        -{product.discount}%
                    </span>
                </div>
                <div className="product-thumb">
                    <div
                        className="product-link"
                        onClick={() => this.handleViewDetailProduct(product)}
                    >
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-title">
                        <div className="product-link"
                            onClick={() => this.handleViewDetailProduct(product)}
                        >
                            {product.name}
                        </div>
                    </div>
                    <div className="product-price">
                        <span className="price-selling">{this.numberWithCommas(product.price * (1 - product.discount / 100))} đ</span>
                        <span className="price-old">{this.numberWithCommas(product.price)} đ</span>
                    </div>
                    <button type="button" className="add-to-cart"
                        onClick={() => this.handleAddToCard(product, cartdetails)}
                    >Thêm vào giỏ hàng</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        cartdetails: state.cartdetail.cartdetails,
        cartInfo: state.cart.carts

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchCartdetailStart: (CartId) => dispatch(actions.fetchCartdetailStart(CartId)),
        createNewCartdetail: (data) => dispatch(actions.createNewCartdetail(data)),
        editCartdetail: (data) => dispatch(actions.editCartdetail(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCard));
