import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import { withRouter } from 'react-router';

import './CartItem.scss'


class CartItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenShortDesc: false
        }
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

    handleOpenDesc = () => {
        this.setState({
            isOpenShortDesc: !this.state.isOpenShortDesc
        })
    }

    handleGoProductPage = (event, id) => {
        event.preventDefault()
        this.props.history.push(`/product/${id}`)
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        let product = this.props.product
        return (
            <>
                <div className="cart-p-img">
                    <img src={product.Product.image}
                        onClick={(event) => { this.handleGoProductPage(event, product.Product.id) }}
                    />
                </div>
                <div className="cart-p-content">
                    <a href="" class="cart-p-name"
                        onClick={(event) => { this.handleGoProductPage(event, product.Product.id) }}
                    >{product.Product.name}</a>
                    <div className="cart-p-meta">
                        <div className="cart-p-desc">
                            <div className="collapse">
                                <div className="collapse-header"
                                    onClick={() => { this.handleOpenDesc() }}
                                >
                                    {this.state.isOpenShortDesc ? (<i class="fas fa-angle-right"></i>) : (<i class="fas fa-angle-down"></i>)}
                                    Chi tiết sản phẩm
                                </div>
                                {this.state.isOpenShortDesc ?
                                    (<div className="collapse-body">
                                        <div className="short-desc" dangerouslySetInnerHTML={{ __html: product.Product.shortDescHTML }}></div>
                                    </div>) : (<></>)}
                            </div>
                        </div>
                        <div className="cart-p-price">{this.numberWithCommas(product.Product.price * (100 - product.Product.discount) / 100 * product.amount)} đ</div>
                    </div>
                    <div className="cart-p-actions">
                        Số lượng
                        <div className="cart-p-qty">
                            <span className="qty-decrease">-</span>
                            <input type="tel" className="qty-input" value={product.amount} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));
