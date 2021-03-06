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
        this.props.fetchProducttypeByIdRedux(this.props.match.params.id)
    }

    render() {
        if (Number(this.props.match.params.id) !== this.props.producttypesRedux.id) {
            this.props.fetchProducttypeByIdRedux(this.props.match.params.id)
        }
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <CategoryProductList
                    title={this.props.producttypesRedux.typeName}
                />
                <OutstandingProduct />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        productsRedux: state.product.products,
        producttypesRedux: state.producttype.typeById

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProductsRedux: () => dispatch(actions.fetchAllProductsStart()),
        fetchProductsByTypeRedux: (id) => dispatch(actions.fetchProductsByTypeStart(id)),
        fetchProducttypeByIdRedux: (id) => dispatch(actions.fetchProducttypeByIdStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProductPage);
