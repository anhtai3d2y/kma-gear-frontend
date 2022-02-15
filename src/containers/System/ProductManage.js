import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './ProductManage.scss';
import TableManageProduct from "./TableManageProduct";
import TableRecycleBinProduct from "./TableRecycleBinProduct";
import { debounce } from 'lodash';

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeProductArr: [],
            brandArr: [],

            id: '',
            name: '',
            image: '',
            shortDescHTML: '',
            shortDescMarkdown: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            producttype: '',
            brand: '',
            amount: 0,
            price: 0,
            discount: 0,

            loadingImage: false,

            action: '',

            isShowForm: false,
            isOpenRecycleBin: false,

            searchInfo: '',

        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.getProducttypeStart()
        this.props.getBrandStart()
        this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.typesRedux !== this.props.typesRedux) {
            let arrTypes = this.props.typesRedux
            this.setState({
                typeProductArr: arrTypes,
                producttype: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : ''
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
                shortDescHTML: '',
                shortDescMarkdown: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                producttype: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',
                brand: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : '',
                amount: 0,
                price: 0,
                discount: 0,

                action: CRUDActions.CREATE,

                isShowForm: false
            })
        }
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 200)
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
                    shortDescHTML: this.state.shortDescHTML,
                    shortDescMarkdown: this.state.shortDescMarkdown,
                    descriptionHTML: this.state.descriptionHTML,
                    descriptionMarkdown: this.state.descriptionMarkdown,
                    typeId: Number(this.state.producttype),
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
                    shortDescHTML: this.state.shortDescHTML,
                    shortDescMarkdown: this.state.shortDescMarkdown,
                    descriptionHTML: this.state.descriptionHTML,
                    descriptionMarkdown: this.state.descriptionMarkdown,
                    typeId: Number(this.state.producttype),
                    brandId: Number(this.state.brand),
                    amount: Number(this.state.amount),
                    price: Number(this.state.price),
                    discount: Number(this.state.discount),
                })
            }
            await this.props.fetchProductsRedux()
            this.handleScroll()
        }
    }

    uploadImage = async (event) => {
        let files = event.target.files
        let data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'kma_gear')
        this.setState({
            loadingImage: true
        })
        let res = await fetch(
            'https://api.cloudinary.com/v1_1/dbammxapd/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        let file = await res.json()
        this.setState({
            image: file.secure_url,
            loadingImage: false
        })
    }

    handleEditorShortDescChange = ({ html, text }) => {
        this.setState({
            shortDescHTML: html,
            shortDescMarkdown: text,
        })
    }

    handleEditorDescChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
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

    handleShowForm = () => {
        this.setState({
            isShowForm: !this.state.isShowForm
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleChangeSearchBox = (value) => {
        this.setState({
            searchInfo: value
        })
        if (value !== "") {
            this.handleSearchProducts(value)
        } else {
            this.props.fetchProductsRedux()
        }
    }

    handleSearchProducts = debounce((value) => {
        this.props.fetchSearchProductsRedux(value)
        this.props.fetchSearchProductsShowRedux()
    }, 100)

    handleEditProductFromParent = (product) => {
        this.setState({

            id: product.id,
            name: product.name,
            image: product.image,
            shortDescHTML: product.shortDescHTML,
            shortDescMarkdown: product.shortDescMarkdown,
            descriptionHTML: product.descriptionHTML,
            descriptionMarkdown: product.descriptionMarkdown,
            producttype: product.typeId,
            brand: product.brandId,
            amount: product.amount,
            price: product.price,
            discount: product.discount,

            action: CRUDActions.EDIT,

            isShowForm: true
        })
    }
    handleOpenRecycleBin = () => {
        this.setState({
            isOpenRecycleBin: !this.state.isOpenRecycleBin
        })
    }

    render() {
        let types = this.state.typeProductArr
        let brands = this.state.brandArr
        // isLoadingType dùng khi cần hiển thị màn hình loading
        // let isLoadingType = this.props.isLoadingType

        let { name, image, producttype, brand, amount, price, discount } = this.state
        return (
            <div className="product-manage-container" >
                <div className="title">
                    Quản lý sản phẩm
                </div>
                <div className="product-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "Sửa sản phẩm" : "Thêm sản phẩm"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Tên sản phẩm</label>
                                        <input className="form-control" type="text"
                                            value={name}
                                            onChange={(event) => { this.onChangeInput(event, 'name') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Hình ảnh</label>
                                        <input className="form-control" type="text"
                                            value={image}
                                            onChange={(event) => { this.onChangeInput(event, 'image') }}
                                        />
                                        <input type="file"
                                            name="file"
                                            placeholder="Chọn hình ảnh cho sản phẩm"
                                            onChange={(event) => this.uploadImage(event)}
                                        />
                                        {this.loadingImage ? (
                                            <label>Đang tải hình ảnh</label>
                                        ) : (<div className="product-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}

                                    </div>
                                    <div className="col-6">
                                        <label className="mt-1">Loại sản phẩm</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'producttype') }}
                                            value={producttype}
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
                                        <label className="mt-1">Thương hiệu</label>
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
                                        <label className="mt-1">Số lượng</label>
                                        <input className="form-control" type="text"
                                            value={amount}
                                            onChange={(event) => { this.onChangeInput(event, 'amount') }}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="mt-1">Giá</label>
                                        <input className="form-control" type="text"
                                            value={price}
                                            onChange={(event) => { this.onChangeInput(event, 'price') }}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="mt-1">Chiết khấu</label>
                                        <input className="form-control" type="text"
                                            value={discount}
                                            onChange={(event) => { this.onChangeInput(event, 'discount') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Mô tả ngắn gọn</label>
                                        <MdEditor
                                            style={{ height: '200px' }}
                                            value={this.state.shortDescMarkdown}
                                            renderHTML={text => mdParser.render(text)}
                                            onChange={this.handleEditorShortDescChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Mô tả sản phẩm</label>
                                        <MdEditor
                                            style={{ height: '400px' }}
                                            value={this.state.descriptionMarkdown}
                                            renderHTML={text => mdParser.render(text)}
                                            onChange={this.handleEditorDescChange}
                                        />
                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveProduct() }}
                                        >{this.state.action === CRUDActions.EDIT ? "Lưu" : "Thêm"}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="mb-4 ml-4 btn-go-recyclebin col-6"
                        onClick={() => { this.handleOpenRecycleBin() }}>{this.state.isOpenRecycleBin ? (<div><i i className="fas fa-caret-left"></i> Quay lại</div>) : (<div><i className="fas fa-trash"></i> Thùng rác</div>)}
                    </div>
                    <input type="text" className="mb-4 ml-4 col-6" name="search" autocomplete="off" placeholder="Nhập sản phẩm cần tìm ..."
                        value={this.state.searchInfo}
                        onChange={(e) => this.handleChangeSearchBox(e.target.value)}
                    />
                    {this.state.isOpenRecycleBin ?
                        (<TableRecycleBinProduct
                            action={this.state.action}
                            types={types}
                            brands={brands}
                        />) :
                        (<TableManageProduct
                            handleEditProductFromParent={this.handleEditProductFromParent}
                            action={this.state.action}
                            types={types}
                            brands={brands}
                        />)}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        typesRedux: state.producttype.types,
        isLoadingType: state.producttype.isLoadingType,
        brandsRedux: state.brand.brands,
        isLoadingBrand: state.brand.isLoadingBrand,
        products: state.product.products,
        productsSearch: state.product.productsSearch,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducttypeStart: () => dispatch(actions.fetchProducttypeStart()),
        getBrandStart: () => dispatch(actions.fetchBrandStart()),
        createNewProduct: (data) => dispatch(actions.createNewProduct(data)),
        fetchProductsRedux: () => dispatch(actions.fetchAllProductsStart()),
        editProductRedux: (data) => dispatch(actions.editProduct(data)),
        fetchSearchProductsRedux: (key) => dispatch(actions.fetchSearchProductsStart(key)),
        fetchSearchProductsShowRedux: () => dispatch(actions.fetchSearchProductsShowStart()),


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
