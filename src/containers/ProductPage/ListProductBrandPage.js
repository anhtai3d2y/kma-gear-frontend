import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import CategoryProductList from './Section/CategoryProductList.js'
import OutstandingProduct from "../HomePage/Section/OutstandingProduct.js"
import Footer from '../HomePage/Footer/Footer.js'
import *  as actions from "../../store/actions";



class ListProductBrandPage extends Component {

    componentDidMount() {
        this.props.fetchProductsByBrandRedux(this.props.match.params.id)
        this.props.fetchBrandByIdRedux(this.props.match.params.id)
    }

    render() {
        if (Number(this.props.match.params.id) !== this.props.brandById.id) {
            this.props.fetchBrandByIdRedux(this.props.match.params.id)
        }
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <CategoryProductList
                    title={this.props.brandById.name}
                />
                <OutstandingProduct />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        brandById: state.brand.brandById,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProductsRedux: () => dispatch(actions.fetchAllProductsStart()),
        fetchProductsByBrandRedux: (id) => dispatch(actions.fetchProductsByBrandStart(id)),
        fetchBrandByIdRedux: (id) => dispatch(actions.fetchBrandByIdStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProductBrandPage);
