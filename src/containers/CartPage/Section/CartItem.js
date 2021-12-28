import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";

import CartItem from "./CartItem.js";

import './DetailCart.scss'


class DetailCart extends Component {

    constructor(props) {
        super(props)
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

    render() {
        return (
            <div className="cart-item mt-4" ref={this.scrollTop}>
                <div className="container">
                    afasdasd
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCart);
