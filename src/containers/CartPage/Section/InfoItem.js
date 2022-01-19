import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import { withRouter } from 'react-router';

import './InfoItem.scss'


class InfoItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenShortDesc: false
        }
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
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

    handleOpenDesc = () => {
        this.setState({
            isOpenShortDesc: !this.state.isOpenShortDesc
        })
    }

    handleGoProductPage = (id) => {
        this.props.history.push(`/product/${id}`)
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        let product = this.props.product
        return (
            <>
                <div className="cart-item">
                    <div className="product-name" onClick={() => { this.handleGoProductPage(product.Product.id) }}>{product.Product.name}</div>
                    <div className="product-content">
                        <div className="collapse">
                            <div className="collapse-header"
                                onClick={() => { this.handleOpenDesc() }}
                            >
                                {this.state.isOpenShortDesc ? (<i class="fas fa-angle-right"></i>) : (<i class="fas fa-angle-down"></i>)}
                                Chi tiết sản phẩm
                            </div>
                            {this.state.isOpenShortDesc ?
                                (<div className="collapse-body">
                                    <div className="short-desc" dangerouslySetInnerHTML={{ __html: product.Product.shortDescHTML }}></div>
                                </div>) : (<></>)}
                        </div>
                        <div className="cart-item-price">
                            <div></div>
                            <div>{this.numberWithCommas(product.Product.price * (100 - product.Product.discount) / 100 * product.amount)} đ</div>
                        </div>
                    </div>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoItem));
