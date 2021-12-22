import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
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

            name: '',
            image: '',
            typeproduct: '',
            brand: '',
            amount: 0,
            price: 0,
            discount: 0,
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
    }

    handleSaveProduct = () => {
        toast('save product')
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
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
                            </div>
                            <div className="col-6">
                                <label>Loại sản phẩm</label>
                                <select id="" class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'typeproduct') }}
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
                            <div className="col-12 mt-3">
                                <button type="button" class="btn btn-primary"
                                    onClick={() => { this.handleSaveProduct() }}
                                >Lưu</button>
                            </div>
                        </div>
                    </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeproductStart: () => dispatch(actions.fetchTypeproductStart()),
        getBrandStart: () => dispatch(actions.fetchBrandStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
