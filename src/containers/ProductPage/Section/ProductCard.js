import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductCard.scss'
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from 'react-router';


class ProductCard extends Component {

    handleViewDetailProduct = (product) => {
        this.props.history.push(`/product/${product.id}`)
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
                        <span className="price-selling">{product.price * (100 - product.discount)}</span>
                        <span className="price-old">{product.price}</span>
                    </div>
                    <button type="button" className="add-to-cart">Mua ngay</button>
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
