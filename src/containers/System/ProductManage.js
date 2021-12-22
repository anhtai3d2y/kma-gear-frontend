import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './ProductManage.scss';
import TableManageProduct from "./TableManageProduct";

// import { getAllTypeproductsService } from "../../services/typeproductService";
// import { getAllBrandsService } from "../../services/typeproductService";

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";


class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeProductArr: [],
            brandArr: [],

            id: '',
            name: '',
            image: '',
            typeproduct: '',
            brand: '',
            amount: 0,
            price: 0,
            discount: 0,

            action: '',
        }
    }

    async componentDidMount() {
        this.props.getTypeproductStart()
        this.props.getBrandStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.typesRedux !== this.props.typesRedux) {
            let arrTypes = this.props.typesRedux
            this.setState({
                typeProductArr: arrTypes,
                typeproduct: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : ''
            })
        }
        if (prevProps.brandsRedux !== this.props.brandsRedux) {
            let arrBrands = this.props.brandsRedux
            this.setState({
                brandArr: arrBrands,
                brand: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : ''
            })
        }

        if (prevProps.products !== this.props.products) {
            let arrTypes = this.props.typesRedux
            let arrBrands = this.props.brandsRedux

            this.setState({
                name: '',
                image: '',
                typeproduct: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',
                brand: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : '',
                amount: 0,
                price: 0,
                discount: 0,

                action: CRUDActions.CREATE,
            })
        }
    }

    handleSaveProduct = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let { action } = this.state

            if (action === CRUDActions.CREATE) {
                //create product
                let newProduct = {
                    name: this.state.name,
                    image: this.state.image,
                    typeId: Number(this.state.typeproduct),
                    brandId: Number(this.state.brand),
                    amount: Number(this.state.amount),
                    price: Number(this.state.price),
                    discount: Number(this.state.discount),
                }
                await this.props.createNewProduct(newProduct)
                toast(`Thêm sản phẩm ${newProduct.name} thành công`)
            }
            if (action === CRUDActions.EDIT) {
                //edit product
                await this.props.editProductRedux({
                    id: this.state.id,
                    name: this.state.name,
                    image: this.state.image,
                    typeId: Number(this.state.typeproduct),
                    brandId: Number(this.state.brand),
                    amount: Number(this.state.amount),
                    price: Number(this.state.price),
                    discount: Number(this.state.discount),
                })
            }
            await this.props.fetchProductsRedux()
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['name', 'image', 'amount', 'price', 'discount']
        let arrMessage = ['Tên sản phẩm', 'Hình ảnh', 'Số lượng', 'Giá', 'Chiết khấu']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                if (arrCheck[i] !== 'discount') {
                    isValid = false
                    toast.error(`Bạn đang để trống ${arrMessage[i]}`)
                    return isValid
                } else {
                    if (this.state[arrCheck[i]] === '') {
                        isValid = false
                        toast.error(`Bạn đang để trống ${arrMessage[i]}`)
                        return isValid
                    }
                }
            }
        }
        // toast('Lưu sản phẩm thành công')
        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleEditProductFromParent = (product) => {
        this.setState({

            id: product.id,
            name: product.name,
            image: product.image,
            typeproduct: product.typeId,
            brand: product.brandId,
            amount: product.amount,
            price: product.price,
            discount: product.discount,

            action: CRUDActions.EDIT
        })
    }

    render() {
        let types = this.state.typeProductArr
        let brands = this.state.brandArr
        // isLoadingType dùng khi cần hiển thị màn hình loading
        // let isLoadingType = this.props.isLoadingType

        let { name, image, typeproduct, brand, amount, price, discount } = this.state

        return (
            <div className="product-manage-container" >
                <div className="title">
                    Quản lý sản phẩm
                </div>
                <div className="product-manage-body">

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <b>Thêm sản phẩm</b>
                            </div>
                            <div className="col-12">
                                <label>Tên sản phẩm</label>
                                <input className="form-control" type="text"
                                    value={name}
                                    onChange={(event) => { this.onChangeInput(event, 'name') }}
                                />
                            </div>
                            <div className="col-12">
                                <label>Hình ảnh</label>
                                <input className="form-control" type="text"
                                    value={image}
                                    onChange={(event) => { this.onChangeInput(event, 'image') }}
                                />
                                <div className="product-image mt-4 mb-4">
                                    <img src={image} />
                                </div>
                            </div>
                            <div className="col-6">
                                <label>Loại sản phẩm</label>
                                <select id="" class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'typeproduct') }}
                                    value={typeproduct}
                                >
                                    {types && types.length > 0 &&
                                        types.map((type, index) => {
                                            return (
                                                <option key={type.id} value={type.id}>{type.typeName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label>Thương hiệu</label>
                                <select id="" class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'brand') }}
                                    value={brand}
                                >
                                    {brands && brands.length > 0 &&
                                        brands.map((brand, index) => {
                                            return (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <label>Số lượng</label>
                                <input className="form-control" type="text"
                                    value={amount}
                                    onChange={(event) => { this.onChangeInput(event, 'amount') }}
                                />
                            </div>
                            <div className="col-4">
                                <label>Giá</label>
                                <input className="form-control" type="text"
                                    value={price}
                                    onChange={(event) => { this.onChangeInput(event, 'price') }}
                                />
                            </div>
                            <div className="col-4">
                                <label>Chiết khấu</label>
                                <input className="form-control" type="text"
                                    value={discount}
                                    onChange={(event) => { this.onChangeInput(event, 'discount') }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                    onClick={() => { this.handleSaveProduct() }}
                                >{this.state.action === CRUDActions.EDIT ? "Lưu" : "Thêm"}</button>
                            </div>
                        </div>
                    </div>
                    <TableManageProduct
                        handleEditProductFromParent={this.handleEditProductFromParent}
                        action={this.state.action}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        typesRedux: state.typeproduct.types,
        isLoadingType: state.typeproduct.isLoadingType,
        brandsRedux: state.brand.brands,
        isLoadingBrand: state.brand.isLoadingBrand,
        products: state.product.products

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeproductStart: () => dispatch(actions.fetchTypeproductStart()),
        getBrandStart: () => dispatch(actions.fetchBrandStart()),
        createNewProduct: (data) => dispatch(actions.createNewProduct(data)),
        fetchProductsRedux: () => dispatch(actions.fetchAllProductsStart()),
        editProductRedux: (data) => dispatch(actions.editProduct(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
