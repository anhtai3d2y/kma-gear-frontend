import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import ProductCard from '../../ProductPage/Section/ProductCard.js'


import './CategoryProductList.scss'


class CategoryProductList extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
        this.props.fetchAllProductsRedux()
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

        let arrProducts = this.props.productsRedux
        return (
            <div className="category-product-list mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="list-header">
                        <div className="list-header-top">
                            <div class="category-name">Gaming Laptop <span>(134 sản phẩm)</span></div>
                            <div class="category-sort">
                                Sắp xếp theo:
                                <select id="input-sort" onchange="location = this.value;" class="form-control">
                                    <option value="https://www.tncstore.vn/gaming-laptop.html?sort=p.date_added&amp;order=DESC">Mới nhất</option>
                                    <option value="https://www.tncstore.vn/gaming-laptop.html?sort=p.price&amp;order=ASC">Giá (Thấp - cao)</option>
                                    <option value="https://www.tncstore.vn/gaming-laptop.html?sort=p.price&amp;order=DESC">Giá (Cao - thấp)</option>
                                    <option value="https://www.tncstore.vn/gaming-laptop.html?sort=pd.name&amp;order=ASC">Tên (A - Z)</option>
                                    <option value="https://www.tncstore.vn/gaming-laptop.html?sort=pd.name&amp;order=DESC">Tên (Z - A)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="product-list mt-4">
                        {arrProducts && arrProducts.length > 0 &&
                            arrProducts.map((product, index) => {
                                return (
                                    <ProductCard product={product} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        productsRedux: state.product.products

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsById: (id) => dispatch(actions.fetchProductsByIdSuccess(id)),
        fetchAllProductsRedux: () => dispatch(actions.fetchAllProductsStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductList);
