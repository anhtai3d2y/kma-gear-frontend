import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeBanner from '../HomePage/Banner/HomeBanner.js'
import HomeHeader from '../HomePage/Header/HomeHeader.js'
import CategoryProductList from './Section/CategoryProductList.js'
import OutstandingProduct from "../HomePage/Section/OutstandingProduct.js"
import Footer from '../HomePage/Footer/Footer.js'



class ListProductPage extends Component {

    render() {
        let productId = this.props.match.params.id
        return (
            <div>
                <HomeBanner />
                <HomeHeader />
                <CategoryProductList />
                <div>this is list product page</div>
                <OutstandingProduct />
                <Footer />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListProductPage);
