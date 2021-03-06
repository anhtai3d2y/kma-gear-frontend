import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'

import *  as actions from "../../../store/actions";
import ProductCard from '../../ProductPage/Section/ProductCard.js'
import {
    sortByDateDESC,
    sortByPriceASC,
    sortByPriceDESC,
    sortByNameASC,
    sortByNameDESC,
} from '../../../utils/SortUtils.js';


import './CategoryProductList.scss'


class CategoryProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // mainBanners: []
            amountShowProduct: 12,
            sortBy: 1,
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

    handleChangeSortType = (e) => {
        this.setState({
            sortBy: Number(e.target.value)
        })
    }

    sort = (arrProducts) => {
        switch (this.state.sortBy) {
            case 1:
                arrProducts.sort(sortByDateDESC)
                break;
            case 2:
                arrProducts.sort(sortByPriceASC)
                break;
            case 3:
                arrProducts.sort(sortByPriceDESC)
                break;
            case 4:
                arrProducts.sort(sortByNameASC)
                break;
            case 5:
                arrProducts.sort(sortByNameDESC)
                break;

            default:
                break;
        }
        return arrProducts
    }

    render() {
        let arrProducts = this.props.productsRedux
        arrProducts = this.sort(arrProducts)
        let title = this.props.title ? (this.props.title) : "Danh s??ch s???n ph???m"

        return (
            <div className="category-product-list mt-4" ref={this.scrollTop}>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className="container">
                    <div className="list-header">
                        <div className="list-header-top">
                            <div className="category-name">{title} <span>({arrProducts.length} s???n ph???m)</span></div>
                            <div className="category-sort">
                                S???p x???p theo:
                                <select id="input-sort" className="form-control"
                                    onChange={(e) => this.handleChangeSortType(e)}
                                >
                                    <option value="1">M???i nh???t</option>
                                    <option value="2">Gi?? (Th???p - cao)</option>
                                    <option value="3">Gi?? (Cao - th???p)</option>
                                    <option value="4">T??n (A - Z)</option>
                                    <option value="5">T??n (Z - A)</option>
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
                        >XEM TH??M</a></div>) : (<></>)
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
