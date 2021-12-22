import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductCard.scss'
import { changeLanguageApp } from "../../../store/actions";

class ProductCard extends Component {

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
                    <a href="https://www.tncstore.vn/laptop-gaming-acer-nitro-5-an515-57-71vv.html"
                        className="product-link"
                    >
                        <img src={product.image} alt={product.name} />
                    </a>
                </div>
                <div className="product-bottom">
                    <div className="product-title">
                        <a href="https://www.tncstore.vn/card-man-hinh-msi-geforce-rtx-3060-ti-ventus-3x-oc.html" className="product-link">
                            {product.name}
                        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
