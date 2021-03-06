import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import InfoItem from "./InfoItem.js";
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify';


import './DetailCheckout.scss'


class DetailCheckout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: this.props.customerInfo ? this.props.customerInfo.fullName : '',
            email: this.props.customerInfo ? this.props.customerInfo.email : '',
            phoneNumber: this.props.customerInfo ? this.props.customerInfo.phoneNumber : '',
            address: this.props.customerInfo ? this.props.customerInfo.address : '',
            note: '',
            paymentType: 1,
            paypalLink: ''
        }
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState) {
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

    handleCheckout = (event) => {
        event.preventDefault()
        switch (this.state.paymentType) {
            case 1:
                this.paymentOnDelivery()
                break;
            case 2:
                this.paymentByPaypal()
                break;
            case 3:
                this.paymentByBank()
                break;

            default:
                break;
        }
        // this.props.history.push(`/checkout`)
    }

    paymentOnDelivery = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.createNewBill('', '')
        }
    }

    paymentByPaypal = async () => {
        // this.props.fetchCurrencyStart()
        // let currencyVNDToUSD = await fetch('http://data.fixer.io/api/latest?access_key=f72e203d0060492aef14ae6921ab81f7&format=1')
        //     .then(response => response.json())
        //     .then(data => this.handleCaculateCurrency(data));
        let isValid = this.checkValidateInput()
        if (isValid) {
            let currencyVNDToUSD = 23000
            console.log('VND to USD', currencyVNDToUSD)
            let arrDetails = []
            let totalPrice = 0
            let { cartdetails } = this.props
            for (let i = 0; i < cartdetails.length; i++) {
                let cd = cartdetails[i]
                let price = Math.round(cd.price * (1 - cd.discount / 100) / currencyVNDToUSD * 100) / 100
                let newDetail = {
                    name: cd.Product.name,
                    sku: cd.ProductId.toString(),
                    price: price,
                    currency: "USD",
                    quantity: cd.amount
                }
                arrDetails.push(newDetail)
                totalPrice = totalPrice + parseFloat((price * cd.amount).toFixed(2))
            }
            totalPrice = parseFloat(totalPrice.toFixed(2))
            await this.props.payWithPaypal({
                arrDetails,
                totalPrice: totalPrice.toString(),
            })
            this.createNewBill(this.props.paypalInfo.paymentId, totalPrice.toString())
            window.open(this.props.paypalInfo.paypalLink)
        }
    }

    handleCaculateCurrency = (data) => {
        let USD = data.rates.USD
        let VND = data.rates.VND
        return VND / USD
    }

    paymentByBank = () => {
        console.log("thanh toan qua ngan hang")
    }

    createNewBill = async (payId, totalPrice) => {
        let newBill = {
            UserId: this.props.customerInfo.id,
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            note: this.state.note,
            StateId: 1,
            PaymenttypeId: 1,
            payId: payId,
            totalPrice: totalPrice
        }
        await this.props.createNewBill(newBill)
        let arrDetails = []
        let arrProducts = []
        let { cartdetails } = this.props
        for (let i = 0; i < cartdetails.length; i++) {
            let cd = cartdetails[i]
            let newDetail = {
                BillId: this.props.bill.id,
                ProductId: cd.ProductId,
                price: cd.Product.price,
                discount: cd.Product.discount,
                amount: cd.amount,

            }
            let newProduct = {
                id: cd.Product.id,
                name: cd.Product.name,
                BrandId: cd.Product.BrandId,
                TypeId: cd.Product.TypeId,
                amount: cd.Product.amount - cd.amount,
                price: cd.Product.price,
                discount: cd.Product.discount,
                image: cd.Product.image,
                shortDescHTML: cd.Product.shortDescHTML,
                shortDescMarkdown: cd.Product.shortDescMarkdown,
                descriptionHTML: cd.Product.descriptionHTML,
                descriptionMarkdown: cd.Product.descriptionMarkdown,
                deleted: cd.Product.deleted,
            }
            arrDetails.push(newDetail)
            arrProducts.push(newProduct)
        }
        await this.props.bulkCreateInvoicedetail(arrDetails)
        await this.props.updateAmountProduct(arrProducts)
        await this.props.clearCartdetail(this.props.cartInfo.id)
        await this.props.fetchCartdetailStart(this.props.cartInfo.id)
        this.props.history.push(`/account`)
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['fullName', 'email', 'phoneNumber', 'address']
        let arrMessage = ['t??n ng?????i nh???n', 'email', 's??? ??i???n tho???i', '?????a ch???']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error(`B???n ??ang ????? tr???ng ${arrMessage[i]}`)
                return isValid
            }
        }
        return isValid
    }

    handleChangePaymentType = (event) => {
        this.setState({
            paymentType: Number(event.target.value)
        })
    }

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        const { cartdetails, customerInfo } = this.props;
        let linkToRedirect = customerInfo && cartdetails && cartdetails.length > 0 ? '/checkout' : '/cart';
        let totalProductsCart = cartdetails.reduce((total, item) => {
            return total + item.amount
        }, 0)
        let totalPriceCart = cartdetails.reduce((total, item) => {
            return total + item.amount * item.Product.price * (100 - item.Product.discount) / 100
        }, 0)
        return (
            <div className="detail-cart mt-4" ref={this.scrollTop}>
                <Helmet>
                    <title>Thanh to??n</title>
                </Helmet>
                <Redirect to={linkToRedirect} />
                <div className="container">
                    <div className="cart">
                        <div className="cart-products inline">
                            <div className="cart-process">
                                <div className="process active"><span>1. Ch???n s???n ph???m</span></div>
                                <div className="process active"><span>2. X??c nh???n ????n h??ng</span></div>
                                <div className="process active"><span>3. Thanh to??n</span></div>
                            </div>
                            <div className="group-info">
                                <div className="title">TH??NG TIN GIAO H??NG</div>
                                <div className="input-group">
                                    <label for="">H??? t??n qu?? kh??ch <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nh???p t??n kh??ch h??ng" className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => { this.onChangeInput(event, 'fullName') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">?????a ch??? email <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nh???p email" className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">S??? ??i???n tho???i <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nh???p s??? ??i???n tho???i" className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">?????a ch??? th?????ng tr?? <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" placeholder="Nh???p ?????a ch???" className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label for="">Ghi ch?? </label>
                                    <textarea placeholder="Nh???p ghi ch??" className="form-control" rows="2"
                                        value={this.state.note}
                                        onChange={(event) => { this.onChangeInput(event, 'note') }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="group-info pay-method">
                                <div className="title">H??nh th???c thanh to??n</div>
                                <div className="input-group">
                                    <input type="radio" value={1} className="input-radio" name="payMethod" checked={this.state.paymentType === 1}
                                        onClick={(event) => { this.handleChangePaymentType(event) }}
                                    />
                                    <label for="">Thanh to??n t???i n??i giao h??ng</label>
                                </div>
                                <div className="input-group">
                                    <input type="radio" value={2} className="input-radio" name="payMethod" checked={this.state.paymentType === 2}
                                        onClick={(event) => { this.handleChangePaymentType(event) }}
                                    />
                                    <label for="">Thanh to??n qua Paypal</label>
                                </div>
                                {/* <div className="input-group">
                                    <input type="radio" value={3} className="input-radio" name="payMethod" checked={this.state.paymentType === 3}
                                        onClick={(event) => { this.handleChangePaymentType(event) }}
                                    />
                                    <label for="">Thanh to??n qua ng??n h??ng</label>
                                </div> */}
                            </div>

                        </div>
                        <div className="cart-total-prices">
                            <div className="cart-prices">
                                <div className="title">TH??NG TIN GI??? H??NG</div>
                                <div>S??? l?????ng s???n ph???m <span className="p-count">{totalProductsCart}</span></div>
                                <div>T???ng chi ph?? <span className="price">{this.numberWithCommas(totalPriceCart)} ??</span></div>
                                <div className="text-vat">???? bao g???m VAT (n???u c??)</div>

                                {cartdetails && cartdetails.length > 0 &&
                                    cartdetails.map((product, index) => {
                                        return (
                                            <div className="cart-p-item">
                                                <InfoItem product={product} />
                                            </div>
                                        )
                                    })
                                }
                                <a href="" className="go-checkout"
                                    onClick={(event) => { this.handleCheckout(event) }}
                                >X??c nh???n mua h??ng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        paypalInfo: state.paypal.paypalInfo,
        cartInfo: state.cart.carts,
        cartdetails: state.cartdetail.cartdetails,
        customerInfo: state.customer.customerInfo,
        bill: state.bill.bill,
        currencyVNDToUSD: state.currency.currencyVNDToUSD,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        payWithPaypal: (data) => dispatch(actions.payWithPaypalStart(data)),
        createNewBill: (data) => dispatch(actions.createNewBill(data)),
        bulkCreateInvoicedetail: (data) => dispatch(actions.bulkCreateInvoicedetail(data)),
        updateAmountProduct: (data) => dispatch(actions.updateAmountProduct(data)),
        clearCartdetail: (CartId) => dispatch(actions.clearCartdetail(CartId)),
        fetchCartdetailStart: (CartId) => dispatch(actions.fetchCartdetailStart(CartId)),
        fetchCurrencyStart: () => dispatch(actions.fetchCurrencyStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCheckout));
