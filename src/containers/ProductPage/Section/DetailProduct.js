import React, { Component } from 'react';
import { connect } from 'react-redux';
import PolicyBlock from "./PolicyBlock.js"
import BlockHeaderTitle from "../../HomePage/Section/BlockHeaderTitle.js"
import *  as actions from "../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router';

import './DetailProduct.scss'


class DetailProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productId: '',
            amountAddToCart: 1
        }
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
        this.props.fetchProductsById(this.props.productId)
        this.setState({
            productId: this.props.productId
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // this.handleScroll()
        if (prevState.productId !== this.props.productId) {
            this.setState({
                productId: this.props.productId
            })
            this.props.fetchProductsById(this.state.productId)
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

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    handleChangeAmount = (event, product, cartdetails) => {
        console.log(event.target.value)
        if (event.target.value === '0' || event.target.value === '') {
            this.setState({
                amountAddToCart: 1
            })
        } else {
            let { isExisted, cartdetail } = this.checkExistedProduct(product, cartdetails)
            console.log(product, cartdetails)
            let amountAddToCart = this.state.amountAddToCart
            let amount
            if (isExisted) {
                amount = product.amount - cartdetail.amount
            } else {
                amount = product.amount
            }
            if (amountAddToCart < amount) {
                this.setState({
                    amountAddToCart: Number(event.target.value)
                })
            } else {
                this.setState({
                    amountAddToCart: amount
                })
            }
        }
    }

    handleIncreateAmount = (product, cartdetails) => {
        let { isExisted, cartdetail } = this.checkExistedProduct(product, cartdetails)
        let amountAddToCart = this.state.amountAddToCart
        let amount
        if (isExisted) {
            amount = product.amount - cartdetail.amount
        } else {
            amount = product.amount
        }
        if (amountAddToCart < amount) {
            this.setState({
                amountAddToCart: amountAddToCart + 1
            })
        }
    }

    handleReduceAmount = () => {
        let amountAddToCart = this.state.amountAddToCart
        if (amountAddToCart > 1) {
            this.setState({
                amountAddToCart: amountAddToCart - 1
            })
        }
    }

    handleAddToCart = async (product, cartdetails) => {
        let { isExisted, cartdetail } = this.checkExistedProduct(product, cartdetails)
        let amountAddToCart = this.state.amountAddToCart
        let amount
        if (isExisted) {
            amount = product.amount - cartdetail.amount
            if (amountAddToCart <= amount) {
                await this.props.editCartdetail({
                    id: cartdetail.id,
                    amount: this.state.amountAddToCart + cartdetail.amount,
                })
            } else {
                toast(`Bạn đã thêm hết số lượng của sản phẩm.`)
            }
            await this.props.fetchCartdetailStart(this.props.cartInfo.id)
        } else {
            amount = product.amount
            if (amountAddToCart <= amount) {
                let newCartdetail = {
                    cartId: this.props.cartInfo.id,
                    productId: product.id,
                    price: product.price,
                    amount: this.state.amountAddToCart,
                    discount: product.discount,
                }
                await this.props.createNewCartdetail(newCartdetail)
                await this.props.fetchCartdetailStart(this.props.cartInfo.id)
                toast.success(`Sản phẩm đã được thêm vào giỏ hàng.`)
            }
        }
        this.setState({
            amountAddToCart: 1
        })
    }

    checkExistedProduct = (product, cartdetails) => {
        let existed = {
            isExisted: false,
            cartdetail: {}
        }
        for (let i = 0; i < cartdetails.length; i++) {
            if (product.id === cartdetails[i].productId) {
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
        let product = this.props.productsByIdRedux
        const { cartdetails } = this.props
        return (
            <div className="detail-product mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="product-detail-top">
                        <div className="product-detail-top-left">
                            <a href="https://www.tncstore.vn/index.php?route=product/manufacturer/info&amp;manufacturer_id=158"
                                title={product && product.Brand && product.Brand.name} className="product-brand">
                                <img src={product && product.Brand && product.Brand.image} alt={product && product.Brand && product.Brand.name} />
                            </a>
                            <div className="product-image">
                                <img
                                    src={product && product.image}
                                    title={product && product.name}
                                    alt={product && product.name}
                                />
                            </div>
                        </div>
                        <div className="product-detail-top-right">
                            <h1>{product && product.name}</h1>
                            <div className="rating-guarantee">
                                <div className="product-rate">
                                    <div className="rate-star">
                                        <i className="fas fa-star "></i>
                                        <i className="fas fa-star "></i>
                                        <i className="fas fa-star "></i>
                                        <i className="fas fa-star "></i>
                                        <i className="fas fa-star "></i>
                                    </div>
                                    <div className="rate-text">0 đánh giá</div>
                                </div>
                                <div className="product-guarantee">
                                    <span>Bảo hành 24 Tháng</span>
                                </div>
                            </div>
                            <div className="short-desc" dangerouslySetInnerHTML={{ __html: product.shortDescHTML }}></div>
                            <div id="product" className="status-price">
                                <div className="col1">
                                    <div>
                                        <p className="status-stock">
                                            <span className={product.amount > 0 ? "status status1" : "status status2"}>
                                                <i aria-hidden="true" className="fa fa-circle">

                                                </i>{product.amount > 0 ? "Còn hàng" : "Hết hàng"}
                                            </span>
                                        </p>
                                        <div className="quantity">
                                            Số lượng
                                            <div className="quantity-wrap">
                                                <input type="text" name="quantity" value={this.state.amountAddToCart} size="2"
                                                    onChange={(event) => { this.handleChangeAmount(event, product, cartdetails) }}
                                                />
                                                <div className="qty-action">
                                                    <span title="Thêm" dataAmount={product} className="add-qty"
                                                        onClick={() => { this.handleIncreateAmount(product, cartdetails) }}
                                                    >+</span>
                                                    <span title="Bớt" className="sub-qty"
                                                        onClick={() => { this.handleReduceAmount() }}
                                                    >-</span>
                                                </div></div> <input type="hidden" name="product_id" value="6084" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col2">
                                    <ul className="list-unstyled list-price">
                                        <li>
                                            <p className="price-old">{this.numberWithCommas(product.price)} đ</p>
                                        </li>
                                        <li>
                                            <p className="price">{this.numberWithCommas(product.price * (1 - product.discount / 100))} đ</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {product.amount > 0 ? (
                                <div className="add-cart-buttons">
                                    <button type="button" value={product.id} className="btn-add-cart btn-add-cart-2"
                                        onClick={() => this.handleAddToCart(product, cartdetails)}
                                    >
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00033 18.3334C8.46056 18.3334 8.83366 17.9603 8.83366 17.5001C8.83366 17.0398 8.46056 16.6667 8.00033 16.6667C7.54009 16.6667 7.16699 17.0398 7.16699 17.5001C7.16699 17.9603 7.54009 18.3334 8.00033 18.3334Z" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M17.1663 18.3334C17.6266 18.3334 17.9997 17.9603 17.9997 17.5001C17.9997 17.0398 17.6266 16.6667 17.1663 16.6667C16.7061 16.6667 16.333 17.0398 16.333 17.5001C16.333 17.9603 16.7061 18.3334 17.1663 18.3334Z" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M1.33301 0.833252H4.66634L6.89967 11.9916C6.97588 12.3752 7.1846 12.7199 7.4893 12.9652C7.79399 13.2105 8.17526 13.3407 8.56634 13.3333H16.6663C17.0574 13.3407 17.4387 13.2105 17.7434 12.9652C18.0481 12.7199 18.2568 12.3752 18.333 11.9916L19.6663 4.99992H5.49967" stroke="#005EC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        Thêm vào giỏ
                                    </button>
                                    <button type="button" data-loading-text="Đang tải..." className="btn-add-cart ">
                                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.9187 9.83092L15.9187 8.16922L9.33085 8.16922L9.33085 1.58134H7.66915L7.66915 8.16922L1.08127 8.16922L1.08127 9.83092L7.66915 9.83092L7.66915 16.4188H9.33085L9.33085 9.83092L15.9187 9.83092Z" fill="white"></path>
                                        </svg>
                                        Mua hàng
                                    </button>
                                </div>
                            ) : (
                                <div className="add-cart-buttons">
                                    <button type="button" data-loading-text="Đang tải..." className="btn-add-cart ">
                                        <i class="fas fa-phone mr-3"></i>
                                        Liên hệ : 0932062686
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <PolicyBlock />
                    <div className="product-detail-bottom">
                        <div className="content-bottom">
                            <BlockHeaderTitle headerTitle="THÔNG TIN SẢN PHẨM" />
                            <div className="description" dangerouslySetInnerHTML={{ __html: product.descriptionHTML }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        productsByIdRedux: state.product.productsById,
        cartdetails: state.cartdetail.cartdetails,
        cartInfo: state.cart.carts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsById: (id) => dispatch(actions.fetchProductsByIdStart(id)),
        fetchCartdetailStart: (cartId) => dispatch(actions.fetchCartdetailStart(cartId)),
        createNewCartdetail: (data) => dispatch(actions.createNewCartdetail(data)),
        editCartdetail: (data) => dispatch(actions.editCartdetail(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailProduct));
