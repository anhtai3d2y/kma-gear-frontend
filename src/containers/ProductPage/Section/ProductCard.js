import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductCard.scss'
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from 'react-router';


class ProductCard extends Component {

    handleViewDetailProduct = (product) => {
        this.props.history.push(`/product/${product.id}`)
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        let product = this.props.product
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
                    <button type="button" className="add-to-cart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCard));
