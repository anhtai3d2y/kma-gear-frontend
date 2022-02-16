import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import ProductCard from '../../ProductPage/Section/ProductCard.js'


import './CategoryProductList.scss'


class CategoryProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // mainBanners: []
            amountShowProduct: 12,
        }
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
        // this.props.fetchAllProductsRedux()
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

    handleSeeMore = (e) => {
        e.preventDefault()
        if (this.props.productsRedux.length > this.state.amountShowProduct) {
            this.setState({
                amountShowProduct: this.state.amountShowProduct + 12
            })
        }
    }

    render() {
        let arrProducts = this.props.productsRedux
        return (
            <div className="category-product-list mt-4" ref={this.scrollTop}>
                <div className="container">
                    <div className="list-header">
                        <div className="list-header-top">
                            <div className="category-name">Danh sách sản phẩm <span>({arrProducts.length} sản phẩm)</span></div>
                            <div className="category-sort">
                                Sắp xếp theo:
                                <select id="input-sort" className="form-control">
                                    <option value="https://www.tncstore.vn/gaming-laptop.html?sort=p.date_added&amp;order=DESC">Mới nhất</option>
                                    <option value="">Giá (Thấp - cao)</option>
                                    <option value="">Giá (Cao - thấp)</option>
                                    <option value="">Tên (A - Z)</option>
                                    <option value="">Tên (Z - A)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="product-list mt-4">
                        {arrProducts && arrProducts.length > 0 &&
                            arrProducts.map((product, index) => {
                                return (index < this.state.amountShowProduct) ? (
                                    <ProductCard product={product} />
                                ) : (<></>)
                            })
                        }
                    </div>
                    {arrProducts && arrProducts.length > 0 &&
                        arrProducts.length > this.state.amountShowProduct ?
                        (<div className="block-readmore"><a href=""
                            onClick={(e) => this.handleSeeMore(e)}
                        >XEM THÊM</a></div>) : (<></>)
                    }
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
