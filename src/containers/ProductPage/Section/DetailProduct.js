import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProductPage extends Component {

    render() {
        return (
            <div className="detail-product">
                <div className="container">
                    <div className="product-detail-top">
                        <div className="product-detail-top-left">

                        </div>
                        <div className="product-detail-top-right">

                        </div>
                    </div>
                    <div className="product-policy-block">

                    </div>
                    <div className="product-detail-bottom">

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
