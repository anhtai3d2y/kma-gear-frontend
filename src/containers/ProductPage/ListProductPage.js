import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import CategoryProductList from './Section/CategoryProductList.js'
import OutstandingProduct from "../HomePage/Section/OutstandingProduct.js"
import Footer from '../HomePage/Footer/Footer.js'
import *  as actions from "../../store/actions";



class ListProductPage extends Component {

    componentDidMount() {
        this.props.fetchProductsByTypeRedux(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <CategoryProductList
                    title={'type'}
                />
                <OutstandingProduct />
                <Footer />
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
        fetchAllProductsRedux: () => dispatch(actions.fetchAllProductsStart()),
        fetchProductsByTypeRedux: (id) => dispatch(actions.fetchProductsByTypeStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProductPage);
